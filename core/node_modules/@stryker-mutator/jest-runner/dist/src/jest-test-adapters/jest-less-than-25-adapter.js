import { pluginTokens } from '../plugin-di.js';
/**
 * The adapter used for 22 < Jest < 25.
 * It has a lot of `any` typings here, since the installed typings are not in sync.
 */
export class JestLessThan25TestAdapter {
    constructor(jestWrapper) {
        this.jestWrapper = jestWrapper;
    }
    run({ jestConfig, fileNamesUnderTest, testNamePattern, testLocationInResults }) {
        var _a;
        const config = JSON.stringify(jestConfig);
        return this.jestWrapper.runCLI({
            $0: 'stryker',
            _: fileNamesUnderTest ? fileNamesUnderTest : [],
            findRelatedTests: !!fileNamesUnderTest,
            config,
            runInBand: true,
            silent: true,
            testNamePattern,
            testLocationInResults,
        }, [(_a = jestConfig.rootDir) !== null && _a !== void 0 ? _a : process.cwd()]);
    }
}
JestLessThan25TestAdapter.inject = [pluginTokens.jestWrapper];
//# sourceMappingURL=jest-less-than-25-adapter.js.map