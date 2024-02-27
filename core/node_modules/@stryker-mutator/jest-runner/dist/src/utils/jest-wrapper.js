import path from 'path';
import { commonTokens } from '@stryker-mutator/api/plugin';
import { pluginTokens } from '../plugin-di.js';
export function determineResolveFromDirectory(options, resolve) {
    return options.jest.projectType === 'create-react-app'
        ? path.join(resolve('react-scripts/package.json'), '..')
        : process.cwd();
}
determineResolveFromDirectory.inject = [commonTokens.options, pluginTokens.resolve];
/**
 * Direct stubbing on jest is no longer possible since jest > 25
 */
export class JestWrapper {
    constructor(resolveFromDirectory, requireFrom) {
        // Use requireResolve, that way you can use this plugin from a different directory
        this.jest = requireFrom('jest', resolveFromDirectory);
    }
    runCLI(...args) {
        return this.jest.runCLI(...args);
    }
    getVersion(...args) {
        return this.jest.getVersion(...args);
    }
}
JestWrapper.inject = [pluginTokens.resolveFromDirectory, pluginTokens.requireFromCwd];
//# sourceMappingURL=jest-wrapper.js.map