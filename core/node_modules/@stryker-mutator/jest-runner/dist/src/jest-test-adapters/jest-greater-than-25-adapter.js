import { pluginTokens } from '../plugin-di.js';
export class JestGreaterThan25TestAdapter {
    constructor(jestWrapper) {
        this.jestWrapper = jestWrapper;
    }
    async run({ jestConfig, fileNamesUnderTest, testNamePattern, testLocationInResults }) {
        var _a;
        const config = JSON.stringify(jestConfig);
        const result = await this.jestWrapper.runCLI({
            $0: 'stryker',
            _: fileNamesUnderTest ? fileNamesUnderTest : [],
            findRelatedTests: !!fileNamesUnderTest,
            config,
            runInBand: true,
            silent: true,
            passWithNoTests: true,
            testNamePattern,
            testLocationInResults,
        }, [(_a = jestConfig.rootDir) !== null && _a !== void 0 ? _a : process.cwd()]);
        return result;
    }
}
JestGreaterThan25TestAdapter.inject = [pluginTokens.jestWrapper];
//# sourceMappingURL=jest-greater-than-25-adapter.js.map