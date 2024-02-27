(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScenarioInfo = void 0;
    const logger_1 = require("./logger");
    /**
     * Provides information about a running Cucumber scenario.
     */
    class ScenarioInfo {
        /**
         * Initializes the [[ScenarioInfo]] object.
         *
         * @param scenarioTitle The string title of the currently running Cucumber scenario.
         * @param tags An array of [[TagName]] representing the tags that are in scope for the currently
         * running Cucumber scenario.
         */
        constructor(scenarioTitle, tags) {
            this.scenarioTitle = scenarioTitle;
            this.tags = tags;
        }
        static parseAttributeTags(tags) {
            var _a;
            const RGX = /^@?(?<attributeName>[\w-]+)\((?<value>.+?)\)$/s;
            const result = new Map();
            for (const tag of tags) {
                const match = (_a = tag.match(RGX)) === null || _a === void 0 ? void 0 : _a.groups;
                if (match !== undefined) {
                    const { attributeName, value } = match;
                    result.set(attributeName, JSON.parse(value));
                }
            }
            logger_1.default.trace("Parsed attribute tags", { fromTags: tags, options: result });
            return result;
        }
        static parseOptionTags(tags) {
            var _a;
            const RGX = /^@?(?<option>[\w-]+)\((?<value>.+?)\)$/s;
            const result = new Map();
            for (const tag of tags) {
                const match = (_a = tag.match(RGX)) === null || _a === void 0 ? void 0 : _a.groups;
                if (match !== undefined) {
                    const { option, value } = match;
                    result.set(option, value);
                }
            }
            logger_1.default.trace("Parsed options", { fromTags: tags, options: result });
            return result;
        }
        static parseFlagTags(tags) {
            var _a, _b;
            const RGX = /^@?(?<flag>[\w-]+)$/s;
            const result = new Set();
            for (const tag of tags) {
                const flag = (_b = (_a = tag.match(RGX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.flag;
                if (flag !== undefined) {
                    result.add(flag);
                }
            }
            logger_1.default.trace("Parsed flags", { fromTags: tags, flags: result });
            return result;
        }
        getAttributeTag(name) {
            if (this._attributeTags === undefined) {
                this._attributeTags = ScenarioInfo.parseAttributeTags(this.tags);
            }
            return this._attributeTags.get(name);
        }
        getOptionTag(name) {
            if (this._optionTags === undefined) {
                this._optionTags = ScenarioInfo.parseOptionTags(this.tags);
            }
            return this._optionTags.get(name);
        }
        getFlag(name) {
            if (this._flagTags === undefined) {
                this._flagTags = ScenarioInfo.parseFlagTags(this.tags);
            }
            return this._flagTags.has(name);
        }
    }
    exports.ScenarioInfo = ScenarioInfo;
});
//# sourceMappingURL=scenario-info.js.map