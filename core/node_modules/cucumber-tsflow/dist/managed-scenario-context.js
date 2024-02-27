var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "underscore", "./types", "./scenario-context"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManagedScenarioContext = void 0;
    const _ = require("underscore");
    const types_1 = require("./types");
    /**
     * Represents a [[ScenarioContext]] implementation that manages a collection of context objects that
     * are created and used by binding classes during a running Cucumber scenario.
     */
    class ManagedScenarioContext {
        constructor(_scenarioInfo) {
            this._scenarioInfo = _scenarioInfo;
            this._activeObjects = new Map();
        }
        /**
         * Gets information about the scenario.
         */
        get scenarioInfo() {
            return this._scenarioInfo;
        }
        getOrActivateBindingClass(targetPrototype, contextTypes) {
            return this.getOrActivateObject(targetPrototype, () => {
                return this.activateBindingClass(targetPrototype, contextTypes);
            });
        }
        dispose() {
            this._activeObjects.forEach((value) => {
                if (typeof value.dispose === "function") {
                    value.dispose();
                }
            });
        }
        /**
         * @internal
         */
        getContextInstance(contextType) {
            return this.getOrActivateObject(contextType.prototype, () => {
                if ((0, types_1.isProvidedContextType)(contextType)) {
                    throw new Error(`The requested type "${contextType.name}" should be provided by cucumber-tsflow, but was not registered. Please report a bug.`);
                }
                return new contextType();
            });
        }
        /**
         * @internal
         */
        addExternalObject(value) {
            if (value == null) {
                return;
            }
            const proto = value.constructor.prototype;
            const existingObject = this._activeObjects.get(proto);
            if (existingObject !== undefined) {
                throw new Error(`Conflicting objects of type "${proto.name}" registered.`);
            }
            this._activeObjects.set(proto, value);
        }
        activateBindingClass(targetPrototype, contextTypes) {
            const invokeBindingConstructor = (args) => {
                return new targetPrototype.constructor(...args);
            };
            const contextObjects = _.map(contextTypes, this.getContextInstance.bind(this));
            return invokeBindingConstructor(contextObjects);
        }
        getOrActivateObject(targetPrototype, activatorFunc) {
            let activeObject = this._activeObjects.get(targetPrototype);
            if (activeObject) {
                return activeObject;
            }
            activeObject = activatorFunc();
            this._activeObjects.set(targetPrototype, activeObject);
            return activeObject;
        }
    }
    exports.ManagedScenarioContext = ManagedScenarioContext;
    __exportStar(require("./scenario-context"), exports);
});
//# sourceMappingURL=managed-scenario-context.js.map