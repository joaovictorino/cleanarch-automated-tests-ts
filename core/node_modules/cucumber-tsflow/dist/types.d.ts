import { CucumberAttachments, CucumberLog, WorldParameters } from "./provided-context";
import { ScenarioInfo } from "./scenario-info";
/**
 * A string representation of a [[RegExp]] that defines a Cucumber step pattern.
 */
export type StepPattern = string;
/**
 * A Cucumber tag name.
 */
export type TagName = string;
/**
 * Represents a class that will be injected into a binding class to provide context
 * during the execution of a Cucumber scenario.
 */
export type CustomContextType = new () => any;
export type ProvidedContextType = typeof ScenarioInfo | typeof WorldParameters | typeof CucumberLog | typeof CucumberAttachments;
export type ContextType = ProvidedContextType | CustomContextType;
export declare function isProvidedContextType(typ: ContextType): typ is ProvidedContextType;
export type TypeDecorator = <T>(target: new (...args: any[]) => T) => void;
//# sourceMappingURL=types.d.ts.map