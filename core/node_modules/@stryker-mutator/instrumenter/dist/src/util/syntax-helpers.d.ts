import { INSTRUMENTER_CONSTANTS as ID } from '@stryker-mutator/api/core';
import babel from '@babel/core';
import { Mutant } from '../mutant.js';
export { ID };
/**
 * Returns syntax for the header if JS/TS files
 */
export declare const instrumentationBabelHeader: readonly babel.types.Statement[];
/**
 * returns syntax for `global.activeMutant === $mutantId`
 * @param mutantId The id of the mutant to switch
 */
export declare function mutantTestExpression(mutantId: string): babel.types.CallExpression;
export declare function eqNode<T extends babel.types.Node>(a: T, b: babel.types.Node): b is T;
export declare function offsetLocations(file: babel.types.File, { position, line, column }: {
    position: number;
    line: number;
    column: number;
}): void;
/**
 * Returns a sequence of mutation coverage counters with an optional last expression.
 *
 * @example (global.__coverMutant__(0, 1), 40 + 2)
 * @param mutants The mutants for which covering syntax needs to be generated
 * @param targetExpression The original expression
 */
export declare function mutationCoverageSequenceExpression(mutants: Iterable<Mutant>, targetExpression?: babel.types.Expression): babel.types.Expression;
export declare function isTypeNode(path: babel.NodePath): boolean;
export declare function isImportDeclaration(path: babel.NodePath): boolean;
/**
 * Determines if a location (needle) is included in an other location (haystack)
 * @param haystack The range to look in
 * @param needle the range to search for
 */
export declare function locationIncluded(haystack: babel.types.SourceLocation, needle: babel.types.SourceLocation): boolean;
/**
 * Determines if two locations overlap with each other
 */
export declare function locationOverlaps(a: babel.types.SourceLocation, b: babel.types.SourceLocation): boolean;
/**
 * Helper for `types.cloneNode(node, deep: true, withoutLocations: false);`
 */
export declare function deepCloneNode<TNode extends babel.types.Node>(node: TNode): TNode;
//# sourceMappingURL=syntax-helpers.d.ts.map