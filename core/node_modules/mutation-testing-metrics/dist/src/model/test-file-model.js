"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFileModel = void 0;
const source_file_1 = require("./source-file");
const test_model_1 = require("./test-model");
/**
 * Represents a file that contains tests
 */
class TestFileModel extends source_file_1.SourceFile {
    /**
     * @param input the test file content
     * @param name the file name
     */
    constructor(input, name) {
        super();
        this.name = name;
        this.source = input.source;
        this.tests = input.tests.map((testDefinition) => {
            const test = new test_model_1.TestModel(testDefinition);
            test.sourceFile = this;
            return test;
        });
    }
}
exports.TestFileModel = TestFileModel;
//# sourceMappingURL=test-file-model.js.map