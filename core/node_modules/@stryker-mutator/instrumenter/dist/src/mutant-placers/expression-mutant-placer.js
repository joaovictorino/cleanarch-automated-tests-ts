import babel from '@babel/core';
import { mutantTestExpression, mutationCoverageSequenceExpression } from '../util/syntax-helpers.js';
const { types } = babel;
/**
 * Will set the identifier of anonymous function expressions if is located in a variable declaration.
 * Will treat input as readonly. Returns undefined if not needed.
 * @example
 * const a = function() { }
 * becomes
 * const a = function a() {}
 */
function classOrFunctionExpressionNamedIfNeeded(path) {
    var _a;
    if ((path.isFunctionExpression() || path.isClassExpression()) && !path.node.id) {
        if (path.parentPath.isVariableDeclarator() && types.isIdentifier(path.parentPath.node.id)) {
            path.node.id = path.parentPath.node.id;
            return path.node;
        }
        else if (path.parentPath.isObjectProperty() &&
            types.isIdentifier(path.parentPath.node.key) &&
            ((_a = path.getStatementParent()) === null || _a === void 0 ? void 0 : _a.isVariableDeclaration())) {
            path.node.id = path.parentPath.node.key;
            return path.node;
        }
    }
    return;
}
/**
 * Will set the identifier of anonymous arrow function expressions if is located in a variable declaration.
 * Will treat input as readonly. Returns undefined if not needed.
 * @example
 * const a = () => { }
 * becomes
 * const a = (() => { const a = () => {}; return a; })()
 */
function arrowFunctionExpressionNamedIfNeeded(path) {
    if (path.isArrowFunctionExpression() && path.parentPath.isVariableDeclarator() && types.isIdentifier(path.parentPath.node.id)) {
        return types.callExpression(types.arrowFunctionExpression([], types.blockStatement([
            types.variableDeclaration('const', [types.variableDeclarator(path.parentPath.node.id, path.node)]),
            types.returnStatement(path.parentPath.node.id),
        ])), []);
    }
    return;
}
function nameIfAnonymous(path) {
    var _a, _b;
    return (_b = (_a = classOrFunctionExpressionNamedIfNeeded(path)) !== null && _a !== void 0 ? _a : arrowFunctionExpressionNamedIfNeeded(path)) !== null && _b !== void 0 ? _b : path.node;
}
function isMemberOrCallOrNonNullExpression(path) {
    return isCallExpression(path) || isMemberOrNonNullExpression(path);
}
function isMemberOrNonNullExpression(path) {
    return isMemberExpression(path) || path.isTSNonNullExpression();
}
function isMemberExpression(path) {
    return path.isMemberExpression() || path.isOptionalMemberExpression();
}
function isCallExpression(path) {
    return path.isCallExpression() || path.isOptionalCallExpression();
}
function isValidExpression(path) {
    const parent = path.parentPath;
    return !isObjectPropertyKey() && !isPartOfChain() && !parent.isTaggedTemplateExpression();
    /**
     * Determines if the expression is property of an object.
     * @example
     * const a = {
     *  'foo': 'bar' // 'foo' here is an object property
     * };
     */
    function isObjectPropertyKey() {
        return parent.isObjectProperty() && parent.node.key === path.node;
    }
    /**
     * Determines if the expression is part of a call/member chain.
     * @example
     * // bar is part of chain, foo is NOT part of the chain:
     * foo.bar.baz();
     * foo.bar?.baz()
     * foo.bar;
     * foo.bar!;
     * foo.bar();
     * foo?.bar();
     * baz[foo.bar()]
     * bar?.baz[0]
     */
    function isPartOfChain() {
        return (isMemberOrCallOrNonNullExpression(path) &&
            ((isMemberExpression(parent) && !(parent.node.computed && parent.node.property === path.node)) ||
                parent.isTSNonNullExpression() ||
                (isCallExpression(parent) && parent.node.callee === path.node)));
    }
}
/**
 * Places the mutants with a conditional expression: `global.activeMutant === 1? mutatedCode : originalCode`;
 */
export const expressionMutantPlacer = {
    name: 'expressionMutantPlacer',
    canPlace(path) {
        return path.isExpression() && isValidExpression(path);
    },
    place(path, appliedMutants) {
        // Make sure anonymous functions and classes keep their 'name' property
        let expression = nameIfAnonymous(path);
        // Add the mutation coverage expression
        expression = mutationCoverageSequenceExpression(appliedMutants.keys(), expression);
        // Now apply the mutants
        for (const [mutant, appliedMutant] of appliedMutants) {
            expression = types.conditionalExpression(mutantTestExpression(mutant.id), appliedMutant, expression);
        }
        path.replaceWith(expression);
    },
};
//# sourceMappingURL=expression-mutant-placer.js.map