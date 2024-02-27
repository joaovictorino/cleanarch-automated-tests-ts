(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "callsites", "source-map-support"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Callsite = void 0;
    const callsites = require("callsites");
    // @ts-ignore
    const sourceMapSupport = require("source-map-support");
    /**
     * Represents a callsite of where a step binding is being applied.
     */
    class Callsite {
        /**
         * Initializes a new [[Callsite]].
         *
         * @param filename The filename of the callsite.
         * @param lineNumber The line number of the callsite.
         */
        constructor(filename, lineNumber) {
            this.filename = filename;
            this.lineNumber = lineNumber;
        }
        /**
         * Captures the current [[Callsite]] object.
         */
        static capture(up = 1) {
            const stack = callsites()[up + 1];
            const tsStack = sourceMapSupport.wrapCallSite(stack);
            return new Callsite(tsStack.getFileName() || "", tsStack.getLineNumber() || -1);
        }
        /**
         * Returns a string representation of the callsite.
         *
         * @returns A string representing the callsite formatted with the filename and line
         * number.
         */
        toString() {
            return `${this.filename}:${this.lineNumber}`;
        }
    }
    exports.Callsite = Callsite;
});
//# sourceMappingURL=our-callsite.js.map