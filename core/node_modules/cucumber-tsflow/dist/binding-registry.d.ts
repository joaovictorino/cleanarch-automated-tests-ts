import { StepBinding } from "./step-binding";
import { ContextType, StepPattern } from "./types";
/**
 * Represents the default step pattern.
 */
export declare const DEFAULT_STEP_PATTERN: string;
/**
 * Represents the default tag.
 */
export declare const DEFAULT_TAG: string;
/**
 * A metadata registry that captures information about bindings and their bound step bindings.
 */
export declare class BindingRegistry {
    private _bindings;
    private _targetBindings;
    /**
     * Gets the binding registry singleton.
     *
     * @returns A [[BindingRegistry]].
     */
    static get instance(): BindingRegistry;
    /**
     * Updates the binding registry with information about the context types required by a
     * binding class.
     *
     * @param targetPrototype The class representing the binding (constructor function).
     * @param contextTypes An array of [[ContextType]] that define the types of objects that
     * should be injected into the binding class during a scenario execution.
     */
    registerContextTypesForTarget(targetPrototype: any, contextTypes?: ContextType[]): void;
    /**
     * Retrieves the context types that have been registered for a given binding class.
     *
     * @param targetPrototype The class representing the binding (constructor function).
     *
     * @returns An array of [[ContextType]] that have been registered for the specified
     * binding class.
     */
    getContextTypesForTarget(targetPrototype: any): ContextType[];
    /**
     * Updates the binding registry indexes with a step binding.
     *
     * @param stepBinding The step binding that is to be registered with the binding registry.
     */
    registerStepBinding(stepBinding: StepBinding): void;
    /**
     * Retrieves the step bindings that have been registered for a given binding class.
     *
     * @param targetPrototype The class representing the binding (constructor function).
     *
     * @returns An array of [[StepBinding]] objects that have been registered for the specified
     * binding class.
     */
    getStepBindingsForTarget(targetPrototype: any): StepBinding[];
    /**
     * Retrieves the step bindings for a given step pattern and collection of tag names.
     *
     * @param stepPattern The step pattern to search.
     *
     * @returns An array of [[StepBinding]] that map to the given step pattern and set of tag names.
     */
    getStepBindings(stepPattern: StepPattern): StepBinding[];
}
//# sourceMappingURL=binding-registry.d.ts.map