import { HtmlParser } from "../../compiler/src/ml_parser/html_parser.js";
import { TagContentType } from '../../compiler/src/ml_parser/tags.js';
let parser = null;
const getParser = () => {
    if (!parser) {
        parser = new HtmlParser();
    }
    return parser;
};
export function parse(input, options = {}) {
    const { canSelfClose = false, allowHtmComponentClosingTags = false, isTagNameCaseSensitive = false, getTagContentType, } = options;
    return getParser().parse(input, "angular-html-parser", {
        tokenizeExpansionForms: false,
        interpolationConfig: undefined,
        canSelfClose,
        allowHtmComponentClosingTags,
    }, isTagNameCaseSensitive, getTagContentType);
}
// For prettier
export { TagContentType };
export { RecursiveVisitor, visitAll, } from "../../compiler/src/ml_parser/ast.js";
export { ParseSourceSpan, ParseLocation, ParseSourceFile, } from "../../compiler/src/parse_util.js";
export { getHtmlTagDefinition } from "../../compiler/src/ml_parser/html_tags.js";
