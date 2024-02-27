(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@cucumber/cucumber", "underscore", "./binding-registry", "./logger", "./managed-scenario-context", "./provided-context", "./step-binding"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ensureWorldIsInitialized = exports.getBindingFromWorld = exports.binding = void 0;
    const cucumber_1 = require("@cucumber/cucumber");
    const _ = require("underscore");
    const binding_registry_1 = require("./binding-registry");
    const logger_1 = require("./logger");
    const managed_scenario_context_1 = require("./managed-scenario-context");
    const provided_context_1 = require("./provided-context");
    const step_binding_1 = require("./step-binding");
    /**
     * The property name of the current scenario context that will be attached to the Cucumber
     * world object.
     */
    const SCENARIO_CONTEXT_SLOTNAME = "__SCENARIO_CONTEXT";
    /**
     * A set of step patterns that have been registered with Cucumber.
     *
     * In order to support scoped (or tagged) step definitions, we must ensure that any step binding is
     * only registered with Cucumber once. The binding function for that step pattern then becomes
     * responsible for looking up and execuing the step binding based on the context that is in scope at
     * the point of invocation.
     */
    const stepPatternRegistrations = new Map();
    // tslint:disable:no-bitwise
    /**
     * A class decorator that marks the associated class as a CucumberJS binding.
     *
     * @param requiredContextTypes An optional array of Types that will be created and passed into the created
     * object for each scenario.
     *
     * An instance of the decorated class will be created for each scenario.
     */
    function binding(requiredContextTypes) {
        return (target) => {
            ensureSystemBindings();
            const bindingRegistry = binding_registry_1.BindingRegistry.instance;
            bindingRegistry.registerContextTypesForTarget(target.prototype, requiredContextTypes);
            const allBindings = [
                ...bindingRegistry.getStepBindingsForTarget(target),
                ...bindingRegistry.getStepBindingsForTarget(target.prototype),
            ];
            for (const stepBinding of allBindings) {
                if (stepBinding.bindingType & step_binding_1.StepBindingFlags.StepDefinitions) {
                    let stepBindingFlags = stepPatternRegistrations.get(stepBinding.stepPattern.toString());
                    if (stepBindingFlags === undefined) {
                        stepBindingFlags = step_binding_1.StepBindingFlags.none;
                    }
                    if (stepBindingFlags & stepBinding.bindingType) {
                        return;
                    }
                    const bound = bindStepDefinition(stepBinding);
                    if (bound) {
                        stepPatternRegistrations.set(stepBinding.stepPattern.toString(), stepBindingFlags | stepBinding.bindingType);
                    }
                }
                else if (stepBinding.bindingType & step_binding_1.StepBindingFlags.Hooks) {
                    bindHook(stepBinding);
                }
                else {
                    logger_1.default.trace("Ignored binding", stepBinding);
                }
            }
        };
    }
    exports.binding = binding;
    function getContextFromWorld(world) {
        const context = world[SCENARIO_CONTEXT_SLOTNAME];
        if (context instanceof managed_scenario_context_1.ManagedScenarioContext) {
            return context;
        }
        throw new Error('Scenario context have not been initialized in the provided World object.');
    }
    function getBindingFromWorld(world, contextType) {
        const context = getContextFromWorld(world);
        return context.getContextInstance(contextType);
    }
    exports.getBindingFromWorld = getBindingFromWorld;
    function ensureWorldIsInitialized() {
        ensureSystemBindings();
    }
    exports.ensureWorldIsInitialized = ensureWorldIsInitialized;
    /**
     * Ensures that the 'cucumber-tsflow' hooks are bound to Cucumber.
     *
     * @param cucumber The cucumber object.
     *
     * The hooks will only be registered with Cucumber once regardless of which binding invokes the
     * function.
     */
    const ensureSystemBindings = _.once(() => {
        (0, cucumber_1.Before)(function (scenario) {
            logger_1.default.trace("Setting up scenario context for scenario:", JSON.stringify(scenario));
            const scenarioInfo = new managed_scenario_context_1.ScenarioInfo(scenario.pickle.name, _.map(scenario.pickle.tags, (tag) => tag.name));
            const scenarioContext = new managed_scenario_context_1.ManagedScenarioContext(scenarioInfo);
            this[SCENARIO_CONTEXT_SLOTNAME] = scenarioContext;
            scenarioContext.addExternalObject(scenarioInfo);
            scenarioContext.addExternalObject(new provided_context_1.WorldParameters(this.parameters));
            scenarioContext.addExternalObject(new provided_context_1.CucumberLog(this.log.bind(this)));
            scenarioContext.addExternalObject(new provided_context_1.CucumberAttachments(this.attach.bind(this)));
        });
        (0, cucumber_1.After)(function () {
            const scenarioContext = this[SCENARIO_CONTEXT_SLOTNAME];
            if (scenarioContext) {
                scenarioContext.dispose();
            }
        });
        try {
            const stackFilter = require("@cucumber/cucumber/lib/filter_stack_trace");
            const path = require("path");
            const originalFileNameFilter = stackFilter.isFileNameInCucumber;
            if (originalFileNameFilter !== undefined) {
                const projectRootPath = path.join(__dirname, "..") + "/";
                Object.defineProperty(stackFilter, "isFileNameInCucumber", {
                    value: (fileName) => originalFileNameFilter(fileName) ||
                        fileName.startsWith(projectRootPath) ||
                        fileName.includes("node_modules"),
                    configurable: true,
                    enumerable: true,
                });
            }
        }
        catch (_a) {
            // Ignore errors, proper stack filtering is not officially supported
            // so we override on a best effor basis only
        }
        // Decorate the Cucumber step definition snippet builder so that it uses our syntax
        // let currentSnippetBuilder = cucumberSys.SupportCode.StepDefinitionSnippetBuilder;
        // cucumberSys.SupportCode.StepDefinitionSnippetBuilder = function (step, syntax) {
        //     return currentSnippetBuilder(step, {
        //         build: function (functionName: string, pattern, parameters, comment) {
        //             let callbackName = parameters[parameters.length - 1];
        //             return `@${functionName.toLowerCase()}(${pattern})\n` +
        //                    `public ${functionName}XXX (${parameters.join(", ")}): void {\n` +
        //                    `  // ${comment}\n` +
        //                    `  ${callbackName}.pending();\n` +
        //                    `}\n`;
        //         }
        //     });
        // }
    });
    /**
     * Binds a step definition to Cucumber.
     *
     * @param stepBinding The [[StepBinding]] that represents a 'given', 'when', or 'then' step definition.
     */
    function bindStepDefinition(stepBinding) {
        const bindingFunc = function () {
            const bindingRegistry = binding_registry_1.BindingRegistry.instance;
            const scenarioContext = this[SCENARIO_CONTEXT_SLOTNAME];
            const matchingStepBindings = bindingRegistry.getStepBindings(stepBinding.stepPattern.toString());
            const contextTypes = bindingRegistry.getContextTypesForTarget(matchingStepBindings[0].targetPrototype);
            const bindingObject = scenarioContext.getOrActivateBindingClass(matchingStepBindings[0].targetPrototype, contextTypes);
            return bindingObject[matchingStepBindings[0].targetPropertyKey].apply(bindingObject, arguments);
        };
        Object.defineProperty(bindingFunc, "length", {
            value: stepBinding.argsLength,
        });
        logger_1.default.trace("Binding step:", stepBinding);
        const bindingOptions = {
            timeout: stepBinding.timeout,
            wrapperOptions: stepBinding.wrapperOption,
            tags: stepBinding.tag === binding_registry_1.DEFAULT_TAG ? undefined : stepBinding.tag,
        };
        if (stepBinding.bindingType & step_binding_1.StepBindingFlags.given) {
            (0, cucumber_1.Given)(stepBinding.stepPattern, bindingOptions, bindingFunc);
        }
        else if (stepBinding.bindingType & step_binding_1.StepBindingFlags.when) {
            (0, cucumber_1.When)(stepBinding.stepPattern, bindingOptions, bindingFunc);
        }
        else if (stepBinding.bindingType & step_binding_1.StepBindingFlags.then) {
            (0, cucumber_1.Then)(stepBinding.stepPattern, bindingOptions, bindingFunc);
        }
        else {
            return false;
        }
        return true;
    }
    /**
     * Binds a hook to Cucumber.
     *
     * @param cucumber The cucumber object.
     * @param stepBinding The [[StepBinding]] that represents a 'before', or 'after', step definition.
     */
    function bindHook(stepBinding) {
        var _a;
        const bindingFunc = function () {
            const scenarioContext = this[SCENARIO_CONTEXT_SLOTNAME];
            const contextTypes = binding_registry_1.BindingRegistry.instance.getContextTypesForTarget(stepBinding.targetPrototype);
            const bindingObject = scenarioContext.getOrActivateBindingClass(stepBinding.targetPrototype, contextTypes);
            return bindingObject[stepBinding.targetPropertyKey].apply(bindingObject, arguments);
        };
        const globalBindFunc = () => {
            const targetPrototype = stepBinding.targetPrototype;
            const targetPrototypeKey = stepBinding.targetPropertyKey;
            return targetPrototype[targetPrototypeKey].apply(targetPrototype);
        };
        Object.defineProperty(bindingFunc, "length", {
            value: stepBinding.argsLength,
        });
        const bindingOptions = Object.assign({ timeout: stepBinding.timeout, tags: stepBinding.tag === binding_registry_1.DEFAULT_TAG ? undefined : stepBinding.tag }, (_a = stepBinding.hookOptions) !== null && _a !== void 0 ? _a : {});
        logger_1.default.trace("Binding hook:", stepBinding);
        switch (stepBinding.bindingType) {
            case step_binding_1.StepBindingFlags.before:
                (0, cucumber_1.Before)(bindingOptions, bindingFunc);
                break;
            case step_binding_1.StepBindingFlags.after:
                (0, cucumber_1.After)(bindingOptions, bindingFunc);
                break;
            case step_binding_1.StepBindingFlags.beforeAll:
                (0, cucumber_1.BeforeAll)(globalBindFunc);
                break;
            case step_binding_1.StepBindingFlags.afterAll:
                (0, cucumber_1.AfterAll)(globalBindFunc);
                break;
        }
    }
});
//# sourceMappingURL=binding-decorator.js.map