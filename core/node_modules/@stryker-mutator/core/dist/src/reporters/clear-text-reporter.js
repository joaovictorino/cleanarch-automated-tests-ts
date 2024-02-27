import os from 'os';
import chalk from 'chalk';
import { schema } from '@stryker-mutator/api/core';
import { commonTokens } from '@stryker-mutator/api/plugin';
import { TestStatus } from 'mutation-testing-metrics';
import { tokens } from 'typed-inject';
import { getEmojiForStatus, plural } from '../utils/string-utils.js';
import { ClearTextScoreTable } from './clear-text-score-table.js';
const { MutantStatus } = schema;
export class ClearTextReporter {
    constructor(log, options) {
        this.log = log;
        this.options = options;
        this.out = process.stdout;
        this.writeLine = (output) => {
            this.out.write(`${output !== null && output !== void 0 ? output : ''}${os.EOL}`);
        };
        this.writeDebugLine = (input) => {
            this.log.debug(input);
        };
        this.configConsoleColor();
    }
    configConsoleColor() {
        if (!this.options.allowConsoleColors) {
            chalk.level = 0; // All colors disabled
        }
    }
    onMutationTestReportReady(_report, metrics) {
        this.writeLine();
        this.reportAllTests(metrics);
        this.reportAllMutants(metrics);
        this.writeLine(new ClearTextScoreTable(metrics.systemUnderTestMetrics, this.options).draw());
    }
    reportAllTests(metrics) {
        function indent(depth) {
            return new Array(depth).fill('  ').join('');
        }
        const formatTestLine = (test, state) => {
            return `${this.color('grey', `${test.name}${test.location ? ` [line ${test.location.start.line}]` : ''}`)} (${state})`;
        };
        if (metrics.testMetrics) {
            const reportTests = (currentResult, depth = 0) => {
                var _a;
                const nameParts = [currentResult.name];
                while (!currentResult.file && currentResult.childResults.length === 1) {
                    currentResult = currentResult.childResults[0];
                    nameParts.push(currentResult.name);
                }
                this.writeLine(`${indent(depth)}${nameParts.join('/')}`);
                (_a = currentResult.file) === null || _a === void 0 ? void 0 : _a.tests.forEach((test) => {
                    var _a, _b;
                    switch (test.status) {
                        case TestStatus.Killing:
                            this.writeLine(`${indent(depth + 1)}${this.color('greenBright', '✓')} ${formatTestLine(test, `killed ${(_a = test.killedMutants) === null || _a === void 0 ? void 0 : _a.length}`)}`);
                            break;
                        case TestStatus.Covering:
                            this.writeLine(`${indent(depth + 1)}${this.color('blueBright', '~')} ${formatTestLine(test, `covered ${(_b = test.coveredMutants) === null || _b === void 0 ? void 0 : _b.length}`)}`);
                            break;
                        case TestStatus.NotCovering:
                            this.writeLine(`${indent(depth + 1)}${this.color('redBright', '✘')} ${formatTestLine(test, 'covered 0')}`);
                            break;
                    }
                });
                currentResult.childResults.forEach((childResult) => reportTests(childResult, depth + 1));
            };
            reportTests(metrics.testMetrics);
        }
    }
    reportAllMutants({ systemUnderTestMetrics }) {
        this.writeLine();
        let totalTests = 0;
        const reportMutants = (metrics) => {
            metrics.forEach((child) => {
                var _a;
                (_a = child.file) === null || _a === void 0 ? void 0 : _a.mutants.forEach((result) => {
                    var _a;
                    totalTests += (_a = result.testsCompleted) !== null && _a !== void 0 ? _a : 0;
                    switch (result.status) {
                        case MutantStatus.Killed:
                        case MutantStatus.Timeout:
                        case MutantStatus.RuntimeError:
                        case MutantStatus.CompileError:
                            this.reportMutantResult(result, this.writeDebugLine);
                            break;
                        case MutantStatus.Survived:
                        case MutantStatus.NoCoverage:
                            this.reportMutantResult(result, this.writeLine);
                            break;
                        default:
                    }
                });
                reportMutants(child.childResults);
            });
        };
        reportMutants(systemUnderTestMetrics.childResults);
        this.writeLine(`Ran ${(totalTests / systemUnderTestMetrics.metrics.totalMutants).toFixed(2)} tests per mutant on average.`);
    }
    statusLabel(mutant) {
        const status = MutantStatus[mutant.status];
        return this.options.clearTextReporter.allowEmojis ? `${getEmojiForStatus(status)} ${status}` : status.toString();
    }
    reportMutantResult(result, logImplementation) {
        logImplementation(`[${this.statusLabel(result)}] ${result.mutatorName}`);
        logImplementation(this.colorSourceFileAndLocation(result.fileName, result.location.start));
        result
            .getOriginalLines()
            .split('\n')
            .filter(Boolean)
            .forEach((line) => {
            logImplementation(chalk.red('-   ' + line));
        });
        result
            .getMutatedLines()
            .split('\n')
            .filter(Boolean)
            .forEach((line) => {
            logImplementation(chalk.green('+   ' + line));
        });
        if (result.status === MutantStatus.Survived) {
            if (result.static) {
                logImplementation('Ran all tests for this mutant.');
            }
            else if (result.coveredByTests) {
                this.logExecutedTests(result.coveredByTests, logImplementation);
            }
        }
        else if (result.status === MutantStatus.Killed && result.killedByTests && result.killedByTests.length) {
            logImplementation(`Killed by: ${result.killedByTests[0].name}`);
        }
        else if (result.status === MutantStatus.RuntimeError || result.status === MutantStatus.CompileError) {
            logImplementation(`Error message: ${result.statusReason}`);
        }
        logImplementation('');
    }
    colorSourceFileAndLocation(fileName, position) {
        return [this.color('cyan', fileName), this.color('yellow', position.line), this.color('yellow', position.column)].join(':');
    }
    color(color, ...text) {
        if (this.options.clearTextReporter.allowColor) {
            return chalk[color](...text);
        }
        return text.join('');
    }
    logExecutedTests(tests, logImplementation) {
        if (!this.options.clearTextReporter.logTests) {
            return;
        }
        const testCount = Math.min(this.options.clearTextReporter.maxTestsToLog, tests.length);
        if (testCount > 0) {
            logImplementation('Tests ran:');
            tests.slice(0, testCount).forEach((test) => {
                logImplementation(`    ${test.name}`);
            });
            const diff = tests.length - this.options.clearTextReporter.maxTestsToLog;
            if (diff > 0) {
                logImplementation(`  and ${diff} more test${plural(diff)}!`);
            }
            logImplementation('');
        }
    }
}
ClearTextReporter.inject = tokens(commonTokens.logger, commonTokens.options);
//# sourceMappingURL=clear-text-reporter.js.map