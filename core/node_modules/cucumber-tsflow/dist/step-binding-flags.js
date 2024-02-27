(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StepBindingFlags = void 0;
    // tslint:disable:no-bitwise
    /**
     * The CucumberJS step binding types.
     */
    var StepBindingFlags;
    (function (StepBindingFlags) {
        /**
         * No bindings.
         */
        StepBindingFlags[StepBindingFlags["none"] = 0] = "none";
        /**
         * A 'Given' step definition binding.
         */
        StepBindingFlags[StepBindingFlags["given"] = 1] = "given";
        /**
         * A 'When' step definition binding.
         */
        StepBindingFlags[StepBindingFlags["when"] = 2] = "when";
        /**
         * A 'Then' step definition binding.
         */
        StepBindingFlags[StepBindingFlags["then"] = 4] = "then";
        /**
         * A 'Before' hook binding.
         */
        StepBindingFlags[StepBindingFlags["before"] = 8] = "before";
        /**
         * An 'After' hook binding.
         */
        StepBindingFlags[StepBindingFlags["after"] = 16] = "after";
        /**
         * A 'Before All' hook binding.
         */
        StepBindingFlags[StepBindingFlags["beforeAll"] = 32] = "beforeAll";
        /**
         * An 'After All' hook binding.
         */
        StepBindingFlags[StepBindingFlags["afterAll"] = 64] = "afterAll";
        /**
         * All step definition bindings.
         */
        StepBindingFlags[StepBindingFlags["StepDefinitions"] = 7] = "StepDefinitions";
        /**
         * All hook bindings.
         */
        StepBindingFlags[StepBindingFlags["Hooks"] = 120] = "Hooks";
    })(StepBindingFlags = exports.StepBindingFlags || (exports.StepBindingFlags = {}));
});
//# sourceMappingURL=step-binding-flags.js.map