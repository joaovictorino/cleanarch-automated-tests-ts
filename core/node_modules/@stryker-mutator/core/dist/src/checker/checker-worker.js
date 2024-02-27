import { PluginKind, tokens, commonTokens } from '@stryker-mutator/api/plugin';
import { StrykerError } from '@stryker-mutator/util';
import { coreTokens } from '../di/index.js';
export class CheckerWorker {
    constructor(options, pluginCreator) {
        this.innerCheckers = new Map(options.checkers.map((name) => [name, pluginCreator.create(PluginKind.Checker, name)]));
    }
    async init() {
        for await (const [name, checker] of this.innerCheckers.entries()) {
            try {
                await checker.init();
            }
            catch (error) {
                throw new StrykerError(`An error occurred during initialization of the "${name}" checker`, error);
            }
        }
    }
    async check(checkerName, mutants) {
        return this.perform(checkerName, (checker) => checker.check(mutants));
    }
    async group(checkerName, mutants) {
        return this.perform(checkerName, (checker) => {
            var _a, _b;
            return (_b = (_a = checker.group) === null || _a === void 0 ? void 0 : _a.call(checker, mutants)) !== null && _b !== void 0 ? _b : 
            // Group one by one by default
            mutants.map(({ id }) => [id]);
        });
    }
    perform(checkerName, act) {
        const checker = this.innerCheckers.get(checkerName);
        if (checker) {
            return act(checker);
        }
        else {
            throw new Error(`Checker ${checkerName} does not exist!`);
        }
    }
}
CheckerWorker.inject = tokens(commonTokens.options, coreTokens.pluginCreator);
//# sourceMappingURL=checker-worker.js.map