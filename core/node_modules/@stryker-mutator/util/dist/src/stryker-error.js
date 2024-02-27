import { errorToString } from './errors.js';
export class StrykerError extends Error {
    constructor(message, innerError) {
        super(`${message}${innerError ? `. Inner error: ${errorToString(innerError)}` : ''}`);
        this.innerError = innerError;
    }
}
//# sourceMappingURL=stryker-error.js.map