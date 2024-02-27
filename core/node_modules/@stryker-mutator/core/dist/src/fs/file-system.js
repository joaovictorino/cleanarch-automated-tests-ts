import fs from 'fs';
import { Task } from '@stryker-mutator/util';
import { mergeMap, Subject } from 'rxjs';
const MAX_CONCURRENT_FILE_IO = 256;
class FileSystemAction {
    /**
     * @param work The task, where a resource and input is presented
     */
    constructor(work) {
        this.work = work;
        this.task = new Task();
    }
    async execute() {
        try {
            const output = await this.work();
            this.task.resolve(output);
        }
        catch (err) {
            this.task.reject(err);
        }
    }
}
/**
 * A wrapper around nodejs's 'fs' core module, for dependency injection purposes.
 *
 * Also has but with build-in buffering with a concurrency limit (like graceful-fs).
 */
export class FileSystem {
    constructor() {
        this.todoSubject = new Subject();
        this.subscription = this.todoSubject
            .pipe(mergeMap(async (action) => {
            await action.execute();
        }, MAX_CONCURRENT_FILE_IO))
            .subscribe();
        this.readFile = this.forward('readFile');
        this.copyFile = this.forward('copyFile');
        this.writeFile = this.forward('writeFile');
        this.mkdir = this.forward('mkdir');
        this.readdir = this.forward('readdir');
    }
    dispose() {
        this.subscription.unsubscribe();
    }
    forward(method) {
        return (...args) => {
            const action = new FileSystemAction(() => fs.promises[method](...args));
            this.todoSubject.next(action);
            return action.task.promise;
        };
    }
}
//# sourceMappingURL=file-system.js.map