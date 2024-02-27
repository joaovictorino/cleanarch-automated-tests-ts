/**
 * Wraps a promise in a Task api for convenience.
 */
export class Task {
    constructor() {
        this._isCompleted = false;
        this.resolve = (result) => {
            this._isCompleted = true;
            this.resolveFn(result);
        };
        this.reject = (reason) => {
            this._isCompleted = true;
            this.rejectFn(reason);
        };
        this._promise = new Promise((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
    }
    get promise() {
        return this._promise;
    }
    get isCompleted() {
        return this._isCompleted;
    }
}
/**
 * A task that can expire after the given time.
 */
export class ExpirableTask extends Task {
    constructor(timeoutMS) {
        super();
        this._promise = ExpirableTask.timeout(this._promise, timeoutMS);
    }
    static timeout(promise, ms) {
        const sleep = new Promise((res, rej) => {
            const timer = setTimeout(() => res(ExpirableTask.TimeoutExpired), ms);
            promise
                .then((result) => {
                clearTimeout(timer);
                res(result);
            })
                .catch((error) => {
                clearTimeout(timer);
                rej(error);
            });
        });
        return sleep;
    }
}
ExpirableTask.TimeoutExpired = Symbol('TimeoutExpired');
//# sourceMappingURL=task.js.map