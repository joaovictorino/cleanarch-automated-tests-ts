"use strict";
// The implementation of this file is grabbed and modified from TypeScript source code
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeLineStarts = void 0;
function isLineBreak(ch) {
    // ES5 7.3:
    // The ECMAScript line terminator characters are listed in Table 3.
    //     Table 3: Line Terminator Characters
    //     Code Unit Value     Name                    Formal Name
    //     \u000A              Line Feed               <LF>
    //     \u000D              Carriage Return         <CR>
    //     \u2028              Line separator          <LS>
    //     \u2029              Paragraph separator     <PS>
    // Only the characters in Table 3 are treated as line terminators. Other new line or line
    // breaking characters are treated as white space but not as line terminators.
    return (ch === 10 /* CharacterCodes.lineFeed */ ||
        ch === 13 /* CharacterCodes.carriageReturn */ ||
        ch === 8232 /* CharacterCodes.lineSeparator */ ||
        ch === 8233 /* CharacterCodes.paragraphSeparator */);
}
function computeLineStarts(text) {
    const result = [];
    let pos = 0;
    let lineStart = 0;
    function progressLineStart(pos) {
        result.push(lineStart);
        lineStart = pos;
    }
    // Mutation testing elements works with 1-based lines
    progressLineStart(0);
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        pos++;
        switch (ch) {
            case 13 /* CharacterCodes.carriageReturn */:
                if (text.charCodeAt(pos) === 10 /* CharacterCodes.lineFeed */) {
                    pos++;
                }
                progressLineStart(pos);
                break;
            case 10 /* CharacterCodes.lineFeed */:
                progressLineStart(pos);
                break;
            default:
                if (ch > 127 /* CharacterCodes.maxAsciiCharacter */ && isLineBreak(ch)) {
                    progressLineStart(pos);
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}
exports.computeLineStarts = computeLineStarts;
//# sourceMappingURL=text.js.map