import { createRequire } from 'module';
import { pluginTokens } from '../plugin-di.js';
const require = createRequire(import.meta.url);
export class JestConfigWrapper {
    constructor(resolveFromDirectory) {
        // Use requireResolve, that way you can use this plugin from a different directory
        const requireFromJest = createRequire(require.resolve('jest', { paths: [resolveFromDirectory] }));
        const requireFromJestCli = createRequire(requireFromJest.resolve('jest-cli'));
        this.jestConfig = requireFromJestCli('jest-config');
    }
    readInitialOptions(...args) {
        return this.jestConfig.readInitialOptions(...args);
    }
}
JestConfigWrapper.inject = [pluginTokens.resolveFromDirectory];
//# sourceMappingURL=jest-config-wrapper.js.map