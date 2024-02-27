import { StrykerOptions } from '@stryker-mutator/api/core';
import { MetricsResult } from 'mutation-testing-metrics';
/**
 * Represents a clear text table for mutation score
 */
export declare class ClearTextScoreTable {
    private readonly metricsResult;
    private readonly columns;
    constructor(metricsResult: MetricsResult, options: StrykerOptions);
    private drawBorder;
    private drawHeader;
    private drawRow;
    private drawValues;
    /**
     * Returns a string with the score results drawn in a table.
     */
    draw(): string;
}
//# sourceMappingURL=clear-text-score-table.d.ts.map