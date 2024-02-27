import { ScenarioContext } from "./scenario-context";
import { ScenarioInfo } from "./scenario-info";
import { ContextType } from "./types";
/**
 * Represents a [[ScenarioContext]] implementation that manages a collection of context objects that
 * are created and used by binding classes during a running Cucumber scenario.
 */
export declare class ManagedScenarioContext implements ScenarioContext {
    private readonly _scenarioInfo;
    private _activeObjects;
    constructor(_scenarioInfo: ScenarioInfo);
    /**
     * Gets information about the scenario.
     */
    get scenarioInfo(): ScenarioInfo;
    getOrActivateBindingClass(targetPrototype: any, contextTypes: ContextType[]): any;
    dispose(): void;
    /**
     * @internal
     */
    getContextInstance(contextType: ContextType): any;
    /**
     * @internal
     */
    addExternalObject(value: unknown): void;
    private activateBindingClass;
    private getOrActivateObject;
}
export * from "./scenario-context";
//# sourceMappingURL=managed-scenario-context.d.ts.map