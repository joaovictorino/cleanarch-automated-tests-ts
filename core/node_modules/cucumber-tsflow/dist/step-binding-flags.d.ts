/**
 * The CucumberJS step binding types.
 */
export declare enum StepBindingFlags {
    /**
     * No bindings.
     */
    none = 0,
    /**
     * A 'Given' step definition binding.
     */
    given = 1,
    /**
     * A 'When' step definition binding.
     */
    when = 2,
    /**
     * A 'Then' step definition binding.
     */
    then = 4,
    /**
     * A 'Before' hook binding.
     */
    before = 8,
    /**
     * An 'After' hook binding.
     */
    after = 16,
    /**
     * A 'Before All' hook binding.
     */
    beforeAll = 32,
    /**
     * An 'After All' hook binding.
     */
    afterAll = 64,
    /**
     * All step definition bindings.
     */
    StepDefinitions = 7,
    /**
     * All hook bindings.
     */
    Hooks = 120
}
//# sourceMappingURL=step-binding-flags.d.ts.map