import { TagName } from "./types";
/**
 * Provides information about a running Cucumber scenario.
 */
export declare class ScenarioInfo {
    scenarioTitle: string;
    tags: TagName[];
    private _attributeTags?;
    private _optionTags?;
    private _flagTags?;
    /**
     * Initializes the [[ScenarioInfo]] object.
     *
     * @param scenarioTitle The string title of the currently running Cucumber scenario.
     * @param tags An array of [[TagName]] representing the tags that are in scope for the currently
     * running Cucumber scenario.
     */
    constructor(scenarioTitle: string, tags: TagName[]);
    private static parseAttributeTags;
    private static parseOptionTags;
    private static parseFlagTags;
    getAttributeTag(name: string): unknown | undefined;
    getOptionTag(name: string): string | undefined;
    getFlag(name: string): boolean;
}
//# sourceMappingURL=scenario-info.d.ts.map