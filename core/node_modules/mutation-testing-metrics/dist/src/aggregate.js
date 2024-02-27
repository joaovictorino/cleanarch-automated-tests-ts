"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateResultsByModule = void 0;
const helpers_1 = require("./helpers");
/**
 * Aggregates multiple reports together into a single report, grouped by module.
 *
 * @param resultsByModule The MutationTestResult objects by module name
 * @returns An aggregated result of all provided reports.
 */
function aggregateResultsByModule(resultsByModule) {
    const projectRoots = Object.values(resultsByModule)
        .map((report) => report.projectRoot)
        .filter(helpers_1.isNotNullish);
    const aggregatedResult = {
        files: {},
        schemaVersion: '1.7',
        thresholds: resultsByModule[0]?.thresholds ?? { high: 80, low: 60 },
        projectRoot: projectRoots.length ? (0, helpers_1.determineCommonBasePath)(projectRoots) : undefined,
        config: {},
    };
    return Object.entries(resultsByModule).reduce((acc, [moduleName, report]) => {
        Object.entries((0, helpers_1.normalizeFileNames)(report.files)).forEach(([fileName, fileResult]) => {
            aggregatedResult.files[`${moduleName}/${fileName}`] = {
                ...fileResult,
                mutants: [
                    ...fileResult.mutants.map(({ id, coveredBy, killedBy, ...mutantData }) => ({
                        ...mutantData,
                        id: toUniqueId(moduleName, id),
                        killedBy: toUniqueIds(moduleName, killedBy),
                        coveredBy: toUniqueIds(moduleName, coveredBy),
                    })),
                ],
            };
        });
        if (report.testFiles) {
            const aggregatedTestFiles = aggregatedResult.testFiles ?? (aggregatedResult.testFiles = Object.create(null));
            Object.entries((0, helpers_1.normalizeFileNames)(report.testFiles)).forEach(([fileName, testFileResult]) => {
                aggregatedTestFiles[`${moduleName}/${fileName}`] = {
                    ...testFileResult,
                    tests: testFileResult.tests.map(({ id, ...testData }) => ({ ...testData, id: toUniqueId(moduleName, id) })),
                };
            });
        }
        return acc;
    }, aggregatedResult);
}
exports.aggregateResultsByModule = aggregateResultsByModule;
function toUniqueIds(moduleName, localIds) {
    if (localIds) {
        const toUniqueIdForModule = toUniqueId.bind(undefined, moduleName);
        return localIds.map(toUniqueIdForModule);
    }
    return;
}
function toUniqueId(moduleName, localId) {
    return `${moduleName}_${localId}`;
}
//# sourceMappingURL=aggregate.js.map