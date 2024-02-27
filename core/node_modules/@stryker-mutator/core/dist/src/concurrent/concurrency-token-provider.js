import os from 'os';
import { ReplaySubject, range } from 'rxjs';
import { tokens } from 'typed-inject';
import { commonTokens } from '@stryker-mutator/api/plugin';
export class ConcurrencyTokenProvider {
    get testRunnerToken$() {
        return this.testRunnerTokenSubject;
    }
    constructor(options, log) {
        var _a;
        this.log = log;
        this.testRunnerTokenSubject = new ReplaySubject();
        this.count = 0;
        const cpuCount = os.cpus().length;
        const concurrency = (_a = options.concurrency) !== null && _a !== void 0 ? _a : (cpuCount > 4 ? cpuCount - 1 : cpuCount);
        if (options.checkers.length > 0) {
            this.concurrencyCheckers = Math.max(Math.ceil(concurrency / 2), 1);
            this.checkerToken$ = range(this.concurrencyCheckers);
            this.concurrencyTestRunners = Math.max(Math.floor(concurrency / 2), 1);
            log.info('Creating %s checker process(es) and %s test runner process(es).', this.concurrencyCheckers, this.concurrencyTestRunners);
        }
        else {
            this.concurrencyCheckers = 0;
            this.checkerToken$ = range(1); // at least one checker, the `CheckerFacade` will not create worker process.
            this.concurrencyTestRunners = concurrency;
            log.info('Creating %s test runner process(es).', this.concurrencyTestRunners);
        }
        Array.from({ length: this.concurrencyTestRunners }).forEach(() => this.testRunnerTokenSubject.next(this.tick()));
    }
    freeCheckers() {
        if (this.concurrencyCheckers > 0) {
            this.log.debug('Checking done, creating %s additional test runner process(es)', this.concurrencyCheckers);
            for (let i = 0; i < this.concurrencyCheckers; i++) {
                this.testRunnerTokenSubject.next(this.tick());
            }
            this.testRunnerTokenSubject.complete();
        }
    }
    tick() {
        return this.count++;
    }
    dispose() {
        this.testRunnerTokenSubject.complete();
    }
}
ConcurrencyTokenProvider.inject = tokens(commonTokens.options, commonTokens.logger);
//# sourceMappingURL=concurrency-token-provider.js.map