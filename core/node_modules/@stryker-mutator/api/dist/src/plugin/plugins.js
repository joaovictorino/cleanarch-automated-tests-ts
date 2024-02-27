import { PluginKind } from './plugin-kind.js';
/**
 * Declare a class plugin. Use this method in order to type check the dependency graph of your plugin
 * @param kind The plugin kind
 * @param name The name of the plugin
 * @param injectableClass The class to be instantiated for the plugin
 */
export function declareClassPlugin(kind, name, injectableClass) {
    return {
        injectableClass,
        kind,
        name,
    };
}
/**
 * Declare a factory plugin. Use this method in order to type check the dependency graph of your plugin,
 * @param kind The plugin kind
 * @param name The name of the plugin
 * @param factory The factory used to instantiate the plugin
 */
export function declareFactoryPlugin(kind, name, factory) {
    return {
        factory,
        kind,
        name,
    };
}
//# sourceMappingURL=plugins.js.map