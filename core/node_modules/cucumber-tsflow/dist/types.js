(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./provided-context", "./scenario-info"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isProvidedContextType = void 0;
    const provided_context_1 = require("./provided-context");
    const scenario_info_1 = require("./scenario-info");
    const providedPrototypes = [
        provided_context_1.WorldParameters,
        provided_context_1.CucumberLog,
        provided_context_1.CucumberAttachments,
        scenario_info_1.ScenarioInfo,
    ];
    function isProvidedContextType(typ) {
        return providedPrototypes.some((proto) => Object.is(typ, proto));
    }
    exports.isProvidedContextType = isProvidedContextType;
});
//# sourceMappingURL=types.js.map