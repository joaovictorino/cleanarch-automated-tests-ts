"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUnderTestModel = void 0;
const mutant_model_1 = require("./mutant-model");
const source_file_1 = require("./source-file");
/**
 * Represents a file which was mutated (your production code).
 */
class FileUnderTestModel extends source_file_1.SourceFile {
    /**
     * @param input The file result content
     * @param name The file name
     */
    constructor(input, name) {
        super();
        this.name = name;
        this.language = input.language;
        this.source = input.source;
        this.mutants = input.mutants.map((mutantResult) => {
            const mutant = new mutant_model_1.MutantModel(mutantResult);
            mutant.sourceFile = this;
            return mutant;
        });
    }
    /**
     * Retrieves the lines of code with the mutant applied to it, to be shown in a diff view.
     */
    getMutationLines(mutant) {
        const lineMap = this.getLineMap();
        const start = lineMap[mutant.location.start.line];
        const startOfEndLine = lineMap[mutant.location.end.line];
        const end = lineMap[mutant.location.end.line + 1];
        return `${this.source.substr(start, mutant.location.start.column - 1)}${mutant.replacement ?? mutant.description ?? mutant.mutatorName}${this.source.substring(startOfEndLine + mutant.location.end.column - 1, end)}`;
    }
}
exports.FileUnderTestModel = FileUnderTestModel;
//# sourceMappingURL=file-under-test-model.js.map