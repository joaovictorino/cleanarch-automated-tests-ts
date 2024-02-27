import { highlight, languages } from 'prismjs/components/prism-core';
export var ProgrammingLanguage;
(function (ProgrammingLanguage) {
    ProgrammingLanguage["csharp"] = "cs";
    ProgrammingLanguage["java"] = "java";
    ProgrammingLanguage["javascript"] = "javascript";
    ProgrammingLanguage["html"] = "html";
    ProgrammingLanguage["php"] = "php";
    ProgrammingLanguage["scala"] = "scala";
    ProgrammingLanguage["typescript"] = "typescript";
    ProgrammingLanguage["vue"] = "vue";
    ProgrammingLanguage["gherkin"] = "gherkin";
})(ProgrammingLanguage || (ProgrammingLanguage = {}));
/**
 * Returns the lower case extension without the `.`.
 * @param fileName The file name
 * @returns File extension
 */
export function getExtension(fileName) {
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLocaleLowerCase();
}
/**
 * Determines the programming language based on file extension.
 */
export function determineLanguage(fileName) {
    switch (getExtension(fileName)) {
        case 'cs':
            return ProgrammingLanguage.csharp;
        case 'html':
            return ProgrammingLanguage.html;
        case 'java':
            return ProgrammingLanguage.java;
        case 'js':
        case 'cjs':
        case 'mjs':
            return ProgrammingLanguage.javascript;
        case 'ts':
        case 'tsx':
        case 'cts': // New file extensions
        case 'mts': // https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#new-file-extensions
            return ProgrammingLanguage.typescript;
        case 'scala':
            return ProgrammingLanguage.scala;
        case 'php':
            return ProgrammingLanguage.php;
        case 'vue':
            return ProgrammingLanguage.vue;
        case 'feature':
            return ProgrammingLanguage.gherkin;
        default:
            return undefined;
    }
}
export function highlightCode(code, fileName) {
    const language = determineLanguage(fileName) ?? 'plain';
    let highlightLanguage = language;
    if (language === ProgrammingLanguage.vue) {
        highlightLanguage = ProgrammingLanguage.html;
    }
    return highlight(code, languages[highlightLanguage], highlightLanguage);
}
/**
 * Takes in a highlighted source and transforms into individual lines.
 *
 * Example:
 * ```js
 * `<span class="token comment">/* some
 * multiline comment
 * * /</span>
 * <span class="token identifier">foo</token>`
 * ```
 *
 * Becomes:
 * ```js
 * [
 *   '<span class="token comment">/* some</span>',
 *   '<span class="token comment">multiline comment</span>',
 *   '<span class="token comment">* /</span>',
 *   '<span class="token identifier">foo</token>'
 * ]
 * ```
 *
 * It also allows callers to add background coloring spans.
 *
 * It does this by using a _very simple_ and _very limited_ html parser that understands text with span elements, just enough for highlighted html.
 *
 * @param source The highlighted source
 * @param visitor The visitor function that is executed for each position in the source code and allows callers to inject a marker css class
 * @returns the highlighted source split into lines
 */
export function transformHighlightedLines(source, visitor) {
    let currentLineParts = [];
    const lines = [];
    const currentPosition = {
        column: 0,
        line: 1,
        offset: -1, // incremented to 0 before first visitation
    };
    const currentlyActiveTags = [];
    let tagsNeedOpening = false;
    let pos = 0;
    while (pos < source.length) {
        if (tagsNeedOpening && !isWhitespace(source[pos])) {
            reopenActiveTags();
            tagsNeedOpening = false;
        }
        switch (source[pos]) {
            case Characters.CarriageReturn:
                currentPosition.offset++;
                break;
            case Characters.NewLine:
                endLine();
                currentPosition.offset++;
                currentPosition.line++;
                currentPosition.column = 0;
                tagsNeedOpening = true; // delay opening of the tags to prevent underlined whitespace
                break;
            case Characters.LT: {
                const tag = parseTag();
                if (tag.isClosing) {
                    closeTag(tag);
                }
                else {
                    openTag(tag);
                }
                break;
            }
            case Characters.Amp:
                visitCharacter(parseHtmlEntity());
                break;
            default:
                visitCharacter(source[pos]);
                break;
        }
        pos++;
    }
    endLine();
    return lines;
    function emit(...parts) {
        currentLineParts.push(...parts);
    }
    function reopenActiveTags() {
        currentlyActiveTags.forEach((tag) => emit(printTag(tag)));
    }
    function closeActiveTags() {
        currentlyActiveTags.forEach((tag) => emit(printTag({ ...tag, isClosing: true })));
    }
    function printTag({ attributes, elementName, isClosing }) {
        if (isClosing) {
            return `</${elementName}>`;
        }
        return `<${elementName}${Object.entries(attributes ?? {}).reduce((acc, [name, value]) => (value === undefined ? `${acc} ${name}` : `${acc} ${name}="${value}"`), '')}>`;
    }
    function endLine() {
        closeActiveTags();
        lines.push(currentLineParts.join(''));
        currentLineParts = [];
    }
    function visitCharacter(raw) {
        currentPosition.column++;
        currentPosition.offset++;
        if (visitor) {
            for (const tag of visitor(currentPosition)) {
                if (tag.isClosing) {
                    closeTag(tag);
                }
                else {
                    emit(printTag(tag));
                    currentlyActiveTags.push(tag);
                }
            }
        }
        emit(raw);
    }
    function parseTag() {
        pos++;
        const isClosing = source[pos] === '/' ? true : undefined;
        if (isClosing) {
            pos++;
        }
        const elementNameStartPos = pos;
        while (!isWhitespace(source[pos]) && source[pos] !== Characters.GT) {
            pos++;
        }
        const elementName = source.substring(elementNameStartPos, pos);
        const attributes = parseAttributes();
        return { elementName, attributes, isClosing };
    }
    function openTag(tag) {
        currentlyActiveTags.push(tag);
        emit(printTag(tag));
    }
    function closeTag(tag) {
        // Closing tags can come in out-of-order
        // which means we need to close opened tags and reopen them.
        let tagIndex;
        for (tagIndex = currentlyActiveTags.length - 1; tagIndex >= 0; tagIndex--) {
            const activeTag = currentlyActiveTags[tagIndex];
            if (tag.elementName === activeTag.elementName && activeTag.id === tag.id) {
                // We need to close this tag
                emit(printTag(tag));
                // Remove from currently active tags
                currentlyActiveTags.splice(tagIndex, 1);
                // And re-open previously closed tags
                for (let i = tagIndex; i < currentlyActiveTags.length; i++) {
                    emit(printTag(currentlyActiveTags[i]));
                }
                // Done
                break;
            }
            // Close this active tag, this isn't the tag we're looking for
            // Will get reopened after we've closed the tag we're looking for
            emit(printTag({ ...activeTag, isClosing: true }));
        }
        // If we're at the last tag, throw an error useful for debugging (this shouldn't happen)
        if (tagIndex === -1) {
            throw new Error(`Cannot find corresponding opening tag for ${printTag(tag)}`);
        }
    }
    function parseAttributes() {
        const attributes = Object.create(null);
        while (pos < source.length) {
            const char = source[pos];
            if (char === Characters.GT) {
                return attributes;
            }
            else if (!isWhitespace(char)) {
                const { name, value } = parseAttribute();
                attributes[name] = value;
            }
            pos++;
        }
        throw new Error(`Missing closing tag near ${source.substr(pos - 10)}`);
    }
    function parseAttribute() {
        const startPos = pos;
        while (source[pos] !== '=') {
            pos++;
        }
        const name = source.substring(startPos, pos);
        pos++; // jump over '='
        const value = parseAttributeValue();
        return { name, value };
    }
    function parseAttributeValue() {
        if (source[pos] === '"') {
            pos++;
        }
        const startPos = pos;
        while (source[pos] !== '"') {
            pos++;
        }
        return source.substring(startPos, pos);
    }
    function parseHtmlEntity() {
        const startPos = pos;
        while (source[pos] !== Characters.Semicolon) {
            pos++;
        }
        return source.substring(startPos, pos + 1);
    }
}
export function isWhitespace(char) {
    return char === Characters.NewLine || char === Characters.Space || char === Characters.Tab;
}
export const COLUMN_START_INDEX = 1;
export const LINE_START_INDEX = 1;
var Characters;
(function (Characters) {
    Characters["CarriageReturn"] = "\r";
    Characters["NewLine"] = "\n";
    Characters["Space"] = " ";
    Characters["Amp"] = "&";
    Characters["Semicolon"] = ";";
    Characters["LT"] = "<";
    Characters["GT"] = ">";
    Characters["Tab"] = "\t";
})(Characters || (Characters = {}));
export function findDiffIndices(original, mutated) {
    let focusFrom = 0, focusTo = mutated.length - 1;
    while (original[focusFrom] === mutated[focusFrom] && focusFrom < mutated.length) {
        focusFrom++;
    }
    const lengthDiff = original.length - mutated.length;
    while (original[focusTo + lengthDiff] === mutated[focusTo] && focusTo > focusFrom) {
        focusTo--;
    }
    if (focusTo === focusFrom) {
        // For example '""'
        if (!isWhitespace(mutated[focusFrom - 1])) {
            focusFrom--;
        }
    }
    // Include the next char
    focusTo++;
    // Make an exception for `true` and `false` (end in same character 🤷‍♀️)
    const mutatedPart = mutated.substring(focusFrom, focusTo);
    ['true', 'false'].forEach((keyword) => {
        if (mutatedPart === keyword.substr(0, keyword.length - 1) && keyword[keyword.length - 1] === mutated[focusTo]) {
            focusTo++;
        }
        if (mutatedPart === keyword.substr(1, keyword.length) && keyword[0] === mutated[focusFrom - 1]) {
            focusFrom--;
        }
    });
    return [focusFrom, focusTo];
}
export function gte(a, b) {
    return a.line > b.line || (a.line === b.line && a.column >= b.column);
}
//# sourceMappingURL=code-helpers.js.map