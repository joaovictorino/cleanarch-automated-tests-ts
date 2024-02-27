import babel from '@babel/core';
import { MutantPlacer } from './mutant-placer.js';
/**
 * Places the mutants with a conditional expression: `global.activeMutant === 1? mutatedCode : originalCode`;
 */
export declare const expressionMutantPlacer: MutantPlacer<babel.types.Expression>;
//# sourceMappingURL=expression-mutant-placer.d.ts.map