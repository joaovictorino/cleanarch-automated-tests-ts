import { commonTokens, PluginKind, tokens } from '@stryker-mutator/api/plugin';
import { DryRunStatus, MutantRunStatus, } from '@stryker-mutator/api/test-runner';
import { errorToString } from '@stryker-mutator/util';
import { coreTokens } from '../di/index.js';
export class ChildProcessTestRunnerWorker {
    constructor({ testRunner }, pluginCreator) {
        this.underlyingTestRunner = pluginCreator.create(PluginKind.TestRunner, testRunner);
    }
    async capabilities() {
        return this.underlyingTestRunner.capabilities();
    }
    async init() {
        if (this.underlyingTestRunner.init) {
            await this.underlyingTestRunner.init();
        }
    }
    async dispose() {
        if (this.underlyingTestRunner.dispose) {
            await this.underlyingTestRunner.dispose();
        }
    }
    async dryRun(options) {
        const dryRunResult = await this.underlyingTestRunner.dryRun(options);
        if (dryRunResult.status === DryRunStatus.Complete && !dryRunResult.mutantCoverage && options.coverageAnalysis !== 'off') {
            // @ts-expect-error
            dryRunResult.mutantCoverage = global.__mutantCoverage__;
        }
        if (dryRunResult.status === DryRunStatus.Error) {
            dryRunResult.errorMessage = errorToString(dryRunResult.errorMessage);
        }
        return dryRunResult;
    }
    async mutantRun(options) {
        const result = await this.underlyingTestRunner.mutantRun(options);
        if (result.status === MutantRunStatus.Error) {
            result.errorMessage = errorToString(result.errorMessage);
        }
        return result;
    }
}
ChildProcessTestRunnerWorker.inject = tokens(commonTokens.options, coreTokens.pluginCreator);
//# sourceMappingURL=child-process-test-runner-worker.js.map