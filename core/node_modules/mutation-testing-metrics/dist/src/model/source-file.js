"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFile = exports.assertSourceDefined = void 0;
const helpers_1 = require("../helpers");
function assertSourceDefined(source) {
    if (source === undefined) {
        throw new Error('sourceFile.source is undefined');
    }
}
exports.assertSourceDefined = assertSourceDefined;
class SourceFile {
    getLineMap() {
        assertSourceDefined(this.source);
        return this.lineMap || (this.lineMap = (0, helpers_1.computeLineStarts)(this.source));
    }
    /**
     * Retrieves the source lines based on the `start.line` and `end.line` property.
     */
    getLines(location) {
        assertSourceDefined(this.source);
        const lineMap = this.getLineMap();
        return this.source.substring(lineMap[location.start.line], lineMap[(location.end ?? location.start).line + 1]);
    }
}
exports.SourceFile = SourceFile;
//# sourceMappingURL=source-file.js.map