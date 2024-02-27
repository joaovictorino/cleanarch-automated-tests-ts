import path from 'path';
import { commonTokens, tokens } from '@stryker-mutator/api/plugin';
import fileUrl from 'file-url';
import { reporterUtil } from './reporter-util.js';
const INDENTION_LEVEL = 0;
export const RESOURCES_DIR_NAME = 'strykerResources';
export class JsonReporter {
    constructor(options, log) {
        this.options = options;
        this.log = log;
    }
    onMutationTestReportReady(report) {
        this.mainPromise = this.generateReport(report);
    }
    wrapUp() {
        return this.mainPromise;
    }
    async generateReport(report) {
        const filePath = path.normalize(this.options.jsonReporter.fileName);
        this.log.debug(`Using relative path ${filePath}`);
        await reporterUtil.writeFile(path.resolve(filePath), JSON.stringify(report, null, INDENTION_LEVEL));
        this.log.info(`Your report can be found at: ${fileUrl(filePath)}`);
    }
}
JsonReporter.inject = tokens(commonTokens.options, commonTokens.logger);
//# sourceMappingURL=json-reporter.js.map