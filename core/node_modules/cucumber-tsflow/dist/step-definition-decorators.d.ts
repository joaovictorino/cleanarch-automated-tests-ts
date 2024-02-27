interface StepOptions {
    tag?: string;
    timeout?: number;
    wrapperOption?: any;
}
/**
 * A method decorator that marks the associated function as a 'Given' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag or an options object.
 * @param timeout An optional timeout.
 */
export declare function given(stepPattern: RegExp | string, tagOrOption?: string | StepOptions, timeout?: number): MethodDecorator;
/**
 * A method decorator that marks the associated function as a 'When' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag.
 * @param timeout An optional timeout.
 */
export declare function when(stepPattern: RegExp | string, tagOrOption?: string | StepOptions, timeout?: number): MethodDecorator;
/**
 * A method decorator that marks the associated function as a 'Then' step.
 *
 * @param stepPattern The regular expression that will be used to match steps.
 * @param tag An optional tag.
 * @param timeout An optional timeout.
 */
export declare function then(stepPattern: RegExp | string, tagOrOption?: string | StepOptions, timeout?: number): MethodDecorator;
export {};
//# sourceMappingURL=step-definition-decorators.d.ts.map