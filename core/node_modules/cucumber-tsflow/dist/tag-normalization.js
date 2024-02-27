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
    exports.normalizeTag = void 0;
    function normalizeTag(tag) {
        // Tag is not provided or already includes a @
        if (tag === undefined || tag.includes("@")) {
            return tag;
        }
        // If a tag doesn't include any @, for compatibility, prefix it with a @
        return `@${tag}`;
    }
    exports.normalizeTag = normalizeTag;
});
//# sourceMappingURL=tag-normalization.js.map