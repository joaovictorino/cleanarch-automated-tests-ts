import { progressBarWrapper } from './progress-bar.js';
import { ProgressKeeper } from './progress-keeper.js';
export class ProgressBarReporter extends ProgressKeeper {
    onMutationTestingPlanReady(event) {
        super.onMutationTestingPlanReady(event);
        const progressBarContent = 'Mutation testing  [:bar] :percent (elapsed: :et, remaining: :etc) :tested/:mutants Mutants tested (:survived survived, :timedOut timed out)';
        this.progressBar = new progressBarWrapper.ProgressBar(progressBarContent, {
            complete: '=',
            incomplete: ' ',
            stream: process.stdout,
            total: this.progress.total,
            width: 50,
        });
    }
    onMutantTested(result) {
        const ticks = super.onMutantTested(result);
        const progressBarContent = { ...this.progress, et: this.getElapsedTime(), etc: this.getEtc() };
        if (ticks) {
            this.tick(ticks, progressBarContent);
        }
        else {
            this.render(progressBarContent);
        }
        return ticks;
    }
    tick(ticks, tickObj) {
        var _a;
        (_a = this.progressBar) === null || _a === void 0 ? void 0 : _a.tick(ticks, tickObj);
    }
    render(renderObj) {
        var _a;
        if ((_a = this.progressBar) === null || _a === void 0 ? void 0 : _a.total) {
            this.progressBar.render(renderObj);
        }
    }
}
//# sourceMappingURL=progress-reporter.js.map