(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./binding-registry", "./logger", "./our-callsite", "./step-binding", "./tag-normalization"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.then = exports.when = exports.given = void 0;
    const binding_registry_1 = require("./binding-registry");
    const logger_1 = require("./logger");
    const our_callsite_1 = require("./our-callsite");
    const step_binding_1 = require("./step-binding");
    const tag_normalization_1 = require("./tag-normalization");
    function overloadedOptions(tag, timeout) {
        if (tag === undefined || typeof tag === "string") {
            return { tag, timeout };
        }
        if (timeout !== undefined) {
            throw new Error("Cannot specify a separate timeout argument when an options object is given.");
        }
        return tag;
    }
    /**
     * A method decorator that marks the associated function as a 'Given' step.
     *
     * @param stepPattern The regular expression that will be used to match steps.
     * @param tag An optional tag or an options object.
     * @param timeout An optional timeout.
     */
    function given(stepPattern, tagOrOption, timeout) {
        const callsite = our_callsite_1.Callsite.capture();
        const options = overloadedOptions(tagOrOption, timeout);
        return (target, propertyKey, descriptor) => {
            const stepBinding = {
                stepPattern: stepPattern,
                bindingType: step_binding_1.StepBindingFlags.given,
                targetPrototype: target,
                targetPropertyKey: propertyKey,
                argsLength: target[propertyKey].length,
                callsite: callsite,
                tag: (0, tag_normalization_1.normalizeTag)(options.tag),
                timeout: options.timeout,
                wrapperOption: options.wrapperOption,
            };
            logger_1.default.trace("Registering step definition:", stepBinding);
            binding_registry_1.BindingRegistry.instance.registerStepBinding(stepBinding);
            return descriptor;
        };
    }
    exports.given = given;
    /**
     * A method decorator that marks the associated function as a 'When' step.
     *
     * @param stepPattern The regular expression that will be used to match steps.
     * @param tag An optional tag.
     * @param timeout An optional timeout.
     */
    function when(stepPattern, tagOrOption, timeout) {
        const callsite = our_callsite_1.Callsite.capture();
        const options = overloadedOptions(tagOrOption, timeout);
        return (target, propertyKey, descriptor) => {
            const stepBinding = {
                stepPattern: stepPattern,
                bindingType: step_binding_1.StepBindingFlags.when,
                targetPrototype: target,
                targetPropertyKey: propertyKey,
                argsLength: target[propertyKey].length,
                callsite: callsite,
                tag: (0, tag_normalization_1.normalizeTag)(options.tag),
                timeout: options.timeout,
                wrapperOption: options.wrapperOption,
            };
            binding_registry_1.BindingRegistry.instance.registerStepBinding(stepBinding);
            return descriptor;
        };
    }
    exports.when = when;
    /**
     * A method decorator that marks the associated function as a 'Then' step.
     *
     * @param stepPattern The regular expression that will be used to match steps.
     * @param tag An optional tag.
     * @param timeout An optional timeout.
     */
    function then(stepPattern, tagOrOption, timeout) {
        const callsite = our_callsite_1.Callsite.capture();
        const options = overloadedOptions(tagOrOption, timeout);
        return (target, propertyKey, descriptor) => {
            const stepBinding = {
                stepPattern: stepPattern,
                bindingType: step_binding_1.StepBindingFlags.then,
                targetPrototype: target,
                targetPropertyKey: propertyKey,
                argsLength: target[propertyKey].length,
                callsite: callsite,
                tag: (0, tag_normalization_1.normalizeTag)(options.tag),
                timeout: options.timeout,
                wrapperOption: options.wrapperOption,
            };
            binding_registry_1.BindingRegistry.instance.registerStepBinding(stepBinding);
            return descriptor;
        };
    }
    exports.then = then;
});
//# sourceMappingURL=step-definition-decorators.js.map