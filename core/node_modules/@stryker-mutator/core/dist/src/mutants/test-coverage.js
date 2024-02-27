var _TestCoverage_testsByMutantId, _TestCoverage_testsById, _TestCoverage_staticCoverage, _TestCoverage_hitsByMutantId;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { commonTokens } from '@stryker-mutator/api/plugin';
import { notEmpty } from '@stryker-mutator/util';
import { coreTokens } from '../di/index.js';
export class TestCoverage {
    constructor(testsByMutantId, testsById, staticCoverage, hitsByMutantId) {
        _TestCoverage_testsByMutantId.set(this, void 0);
        _TestCoverage_testsById.set(this, void 0);
        _TestCoverage_staticCoverage.set(this, void 0);
        _TestCoverage_hitsByMutantId.set(this, void 0);
        __classPrivateFieldSet(this, _TestCoverage_testsByMutantId, testsByMutantId, "f");
        __classPrivateFieldSet(this, _TestCoverage_testsById, testsById, "f");
        __classPrivateFieldSet(this, _TestCoverage_staticCoverage, staticCoverage, "f");
        __classPrivateFieldSet(this, _TestCoverage_hitsByMutantId, hitsByMutantId, "f");
    }
    get testsByMutantId() {
        return __classPrivateFieldGet(this, _TestCoverage_testsByMutantId, "f");
    }
    get testsById() {
        return __classPrivateFieldGet(this, _TestCoverage_testsById, "f");
    }
    get hitsByMutantId() {
        return __classPrivateFieldGet(this, _TestCoverage_hitsByMutantId, "f");
    }
    get hasCoverage() {
        // Since static coverage should always be reported when coverage analysis succeeded (albeit an empty object),
        // we can use that to determine if there is any coverage at all
        return !!__classPrivateFieldGet(this, _TestCoverage_staticCoverage, "f");
    }
    hasStaticCoverage(mutantId) {
        return !!(__classPrivateFieldGet(this, _TestCoverage_staticCoverage, "f") && __classPrivateFieldGet(this, _TestCoverage_staticCoverage, "f")[mutantId] > 0);
    }
    addTest(testResult) {
        __classPrivateFieldGet(this, _TestCoverage_testsById, "f").set(testResult.id, testResult);
    }
    addCoverage(mutantId, testIds) {
        var _a;
        const tests = (_a = __classPrivateFieldGet(this, _TestCoverage_testsByMutantId, "f").get(mutantId)) !== null && _a !== void 0 ? _a : new Set();
        __classPrivateFieldGet(this, _TestCoverage_testsByMutantId, "f").set(mutantId, tests);
        testIds
            .map((testId) => __classPrivateFieldGet(this, _TestCoverage_testsById, "f").get(testId))
            .filter(notEmpty)
            .forEach((test) => tests.add(test));
    }
    forMutant(mutantId) {
        return __classPrivateFieldGet(this, _TestCoverage_testsByMutantId, "f").get(mutantId);
    }
}
_TestCoverage_testsByMutantId = new WeakMap(), _TestCoverage_testsById = new WeakMap(), _TestCoverage_staticCoverage = new WeakMap(), _TestCoverage_hitsByMutantId = new WeakMap();
TestCoverage.from = testCoverageFrom;
function testCoverageFrom({ tests, mutantCoverage }, logger) {
    const hitsByMutantId = new Map();
    const testsByMutantId = new Map();
    const testsById = tests.reduce((acc, test) => acc.set(test.id, test), new Map());
    if (mutantCoverage) {
        Object.entries(mutantCoverage.perTest).forEach(([testId, coverage]) => {
            const foundTest = testsById.get(testId);
            if (!foundTest) {
                logger.warn(`Found test with id "${testId}" in coverage data, but not in the test results of the dry run. Not taking coverage data for this test into account.`);
                return;
            }
            Object.entries(coverage).forEach(([mutantId, count]) => {
                if (count > 0) {
                    let cov = testsByMutantId.get(mutantId);
                    if (!cov) {
                        cov = new Set();
                        testsByMutantId.set(mutantId, cov);
                    }
                    cov.add(foundTest);
                }
            });
        });
        // We don't care about the exact tests in this case, just the total number of hits
        const coverageResultsPerMutant = [mutantCoverage.static, ...Object.values(mutantCoverage.perTest)];
        coverageResultsPerMutant.forEach((coverageByMutantId) => {
            Object.entries(coverageByMutantId).forEach(([mutantId, count]) => {
                var _a;
                hitsByMutantId.set(mutantId, ((_a = hitsByMutantId.get(mutantId)) !== null && _a !== void 0 ? _a : 0) + count);
            });
        });
    }
    return new TestCoverage(testsByMutantId, testsById, mutantCoverage === null || mutantCoverage === void 0 ? void 0 : mutantCoverage.static, hitsByMutantId);
}
testCoverageFrom.inject = [coreTokens.dryRunResult, commonTokens.logger];
//# sourceMappingURL=test-coverage.js.map