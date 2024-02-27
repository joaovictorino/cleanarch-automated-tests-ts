import { from, partition, merge, lastValueFrom, EMPTY, concat, bufferTime, mergeMap } from 'rxjs';
import { toArray, map, shareReplay, tap } from 'rxjs/operators';
import { tokens, commonTokens } from '@stryker-mutator/api/plugin';
import { MutantStatus, PlanKind } from '@stryker-mutator/api/core';
import { CheckStatus } from '@stryker-mutator/api/check';
import { coreTokens } from '../di/index.js';
import { isEarlyResult } from '../mutants/index.js';
const CHECK_BUFFER_MS = 10000;
/**
 * Sorting the tests just before running them can yield a significant performance boost,
 * because it can reduce the number of times a test runner process needs to be recreated.
 * However, we need to buffer the results in order to be able to sort them.
 *
 * This value is very low, since it would halt the test execution otherwise.
 * @see https://github.com/stryker-mutator/stryker-js/issues/3462
 */
const BUFFER_FOR_SORTING_MS = 0;
export class MutationTestExecutor {
    constructor(reporter, testRunnerPool, checkerPool, mutants, planner, mutationTestReportHelper, log, options, timer, concurrencyTokenProvider) {
        this.reporter = reporter;
        this.testRunnerPool = testRunnerPool;
        this.checkerPool = checkerPool;
        this.mutants = mutants;
        this.planner = planner;
        this.mutationTestReportHelper = mutationTestReportHelper;
        this.log = log;
        this.options = options;
        this.timer = timer;
        this.concurrencyTokenProvider = concurrencyTokenProvider;
    }
    async execute() {
        if (this.options.dryRunOnly) {
            this.log.info('The dry-run has been completed successfully. No mutations have been executed.');
            return [];
        }
        const mutantTestPlans = await this.planner.makePlan(this.mutants);
        const { earlyResult$, runMutant$ } = this.executeEarlyResult(from(mutantTestPlans));
        const { passedMutant$, checkResult$ } = this.executeCheck(runMutant$);
        const { coveredMutant$, noCoverageResult$ } = this.executeNoCoverage(passedMutant$);
        const testRunnerResult$ = this.executeRunInTestRunner(coveredMutant$);
        const results = await lastValueFrom(merge(testRunnerResult$, checkResult$, noCoverageResult$, earlyResult$).pipe(toArray()));
        await this.mutationTestReportHelper.reportAll(results);
        await this.reporter.wrapUp();
        this.logDone();
        return results;
    }
    executeEarlyResult(input$) {
        const [earlyResultMutants$, runMutant$] = partition(input$.pipe(shareReplay()), isEarlyResult);
        const earlyResult$ = earlyResultMutants$.pipe(map(({ mutant }) => this.mutationTestReportHelper.reportMutantStatus(mutant, mutant.status)));
        return { earlyResult$, runMutant$ };
    }
    executeNoCoverage(input$) {
        const [noCoverageMatchedMutant$, coveredMutant$] = partition(input$.pipe(shareReplay()), ({ runOptions }) => { var _a; return ((_a = runOptions.testFilter) === null || _a === void 0 ? void 0 : _a.length) === 0; });
        const noCoverageResult$ = noCoverageMatchedMutant$.pipe(map(({ mutant }) => this.mutationTestReportHelper.reportMutantStatus(mutant, MutantStatus.NoCoverage)));
        return { noCoverageResult$, coveredMutant$ };
    }
    executeRunInTestRunner(input$) {
        const sortedPlan$ = input$.pipe(bufferTime(BUFFER_FOR_SORTING_MS), mergeMap((plans) => plans.sort(reloadEnvironmentLast)));
        return this.testRunnerPool.schedule(sortedPlan$, async (testRunner, { mutant, runOptions }) => {
            const result = await testRunner.mutantRun(runOptions);
            return this.mutationTestReportHelper.reportMutantRunResult(mutant, result);
        });
    }
    logDone() {
        this.log.info('Done in %s.', this.timer.humanReadableElapsed());
    }
    /**
     * Checks mutants against all configured checkers (if any) and returns steams for failed checks and passed checks respectively
     * @param input$ The mutant run plans to check
     */
    executeCheck(input$) {
        let checkResult$ = EMPTY;
        let passedMutant$ = input$;
        for (const checkerName of this.options.checkers) {
            // Use this checker
            const [checkFailedResult$, checkPassedResult$] = partition(this.executeSingleChecker(checkerName, passedMutant$).pipe(shareReplay()), isEarlyResult);
            // Prepare for the next one
            passedMutant$ = checkPassedResult$;
            checkResult$ = concat(checkResult$, checkFailedResult$.pipe(map(({ mutant }) => mutant)));
        }
        return {
            checkResult$,
            passedMutant$: passedMutant$.pipe(tap({
                complete: async () => {
                    await this.checkerPool.dispose();
                    this.concurrencyTokenProvider.freeCheckers();
                },
            })),
        };
    }
    /**
     * Executes the check task for one checker
     * @param checkerName The name of the checker to execute
     * @param input$ The mutants tasks to check
     * @returns An observable stream with early results (check failed) and passed results
     */
    executeSingleChecker(checkerName, input$) {
        const group$ = this.checkerPool
            .schedule(input$.pipe(bufferTime(CHECK_BUFFER_MS)), (checker, mutants) => checker.group(checkerName, mutants))
            .pipe(mergeMap((mutantGroups) => mutantGroups));
        const checkTask$ = this.checkerPool
            .schedule(group$, (checker, group) => checker.check(checkerName, group))
            .pipe(mergeMap((mutantGroupResults) => mutantGroupResults), map(([mutantRunPlan, checkResult]) => checkResult.status === CheckStatus.Passed
            ? mutantRunPlan
            : {
                plan: PlanKind.EarlyResult,
                mutant: this.mutationTestReportHelper.reportCheckFailed(mutantRunPlan.mutant, checkResult),
            }));
        return checkTask$;
    }
}
MutationTestExecutor.inject = tokens(coreTokens.reporter, coreTokens.testRunnerPool, coreTokens.checkerPool, coreTokens.mutants, coreTokens.mutantTestPlanner, coreTokens.mutationTestReportHelper, commonTokens.logger, commonTokens.options, coreTokens.timer, coreTokens.concurrencyTokenProvider);
/**
 * Sorting function that sorts mutant run plans that reload environments last.
 * This can yield a significant performance boost, because it reduces the times a test runner process needs to restart.
 * @see https://github.com/stryker-mutator/stryker-js/issues/3462
 */
function reloadEnvironmentLast(a, b) {
    if (a.plan === PlanKind.Run && b.plan === PlanKind.Run) {
        if (a.runOptions.reloadEnvironment && !b.runOptions.reloadEnvironment) {
            return 1;
        }
        if (!a.runOptions.reloadEnvironment && b.runOptions.reloadEnvironment) {
            return -1;
        }
        return 0;
    }
    return 0;
}
//# sourceMappingURL=4-mutation-test-executor.js.map