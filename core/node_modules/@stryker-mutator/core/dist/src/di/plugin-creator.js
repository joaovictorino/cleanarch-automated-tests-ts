import { tokens, commonTokens, } from '@stryker-mutator/api/plugin';
import { coreTokens } from './index.js';
export class PluginCreator {
    constructor(pluginsByKind, injector) {
        this.pluginsByKind = pluginsByKind;
        this.injector = injector;
    }
    create(kind, name) {
        const plugin = this.findPlugin(kind, name);
        if (isFactoryPlugin(plugin)) {
            return this.injector.injectFunction(plugin.factory);
        }
        else if (isClassPlugin(plugin)) {
            return this.injector.injectClass(plugin.injectableClass);
        }
        else {
            throw new Error(`Plugin "${kind}:${name}" could not be created, missing "factory" or "injectableClass" property.`);
        }
    }
    findPlugin(kind, name) {
        const plugins = this.pluginsByKind.get(kind);
        if (plugins) {
            const pluginFound = plugins.find((plugin) => plugin.name.toLowerCase() === name.toLowerCase());
            if (pluginFound) {
                return pluginFound;
            }
            else {
                throw new Error(`Cannot find ${kind} plugin "${name}". Did you forget to install it? Loaded ${kind} plugins were: ${plugins.map((p) => p.name).join(', ')}`);
            }
        }
        else {
            throw new Error(`Cannot find ${kind} plugin "${name}". In fact, no ${kind} plugins were loaded. Did you forget to install it?`);
        }
    }
}
PluginCreator.inject = tokens(coreTokens.pluginsByKind, commonTokens.injector);
function isFactoryPlugin(plugin) {
    return !!plugin.factory;
}
function isClassPlugin(plugin) {
    return !!plugin.injectableClass;
}
//# sourceMappingURL=plugin-creator.js.map