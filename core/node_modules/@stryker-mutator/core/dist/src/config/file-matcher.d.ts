/**
 * A helper class for matching files using the `disableTypeChecks` setting.
 */
export declare class FileMatcher {
    private readonly pattern;
    constructor(pattern: boolean | string);
    matches(fileName: string): boolean;
}
//# sourceMappingURL=file-matcher.d.ts.map