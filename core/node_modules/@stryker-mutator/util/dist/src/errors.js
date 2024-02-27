export function isErrnoException(error) {
    return error instanceof Error && typeof error.code === 'string';
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function errorToString(error) {
    if (!error) {
        return '';
    }
    if (error instanceof Error) {
        if (isErrnoException(error)) {
            return `${error.name}: ${error.code} (${error.syscall}) ${error.stack}`;
        }
        const message = `${error.name}: ${error.message}`;
        if (error.stack) {
            return `${message}\n${error.stack.toString()}`;
        }
        else {
            return message;
        }
    }
    return error.toString();
}
export const ERROR_CODES = Object.freeze({
    NoSuchFileOrDirectory: 'ENOENT',
});
//# sourceMappingURL=errors.js.map