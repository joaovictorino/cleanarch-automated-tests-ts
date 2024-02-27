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
    exports.CucumberAttachments = exports.CucumberLog = exports.WorldParameters = void 0;
    class WorldParameters {
        constructor(value) {
            this.value = value;
        }
    }
    exports.WorldParameters = WorldParameters;
    class CucumberLog {
        constructor(target) {
            this.target = target;
        }
        log(text) {
            return this.target(text);
        }
    }
    exports.CucumberLog = CucumberLog;
    class CucumberAttachments {
        constructor(target) {
            this.target = target;
        }
        attach(...args) {
            return this.target.apply(this, args);
        }
    }
    exports.CucumberAttachments = CucumberAttachments;
});
//# sourceMappingURL=provided-context.js.map