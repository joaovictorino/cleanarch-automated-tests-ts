import babel from '@babel/core';
const { types } = babel;
export const blockStatementMutator = {
    name: 'BlockStatement',
    *mutate(path) {
        if (path.isBlockStatement() && isValid(path)) {
            yield types.blockStatement([]);
        }
    },
};
function isValid(path) {
    return !isEmpty(path) && !isInvalidConstructorBody(path);
}
function isEmpty(path) {
    return !path.node.body.length;
}
/**
 * Checks to see if a statement is an invalid constructor body
 * @example
 * // Invalid!
 * class Foo extends Bar {
 *   constructor(public baz: string) {
 *     super(42);
 *   }
 * }
 * @example
 * // Invalid!
 * class Foo extends Bar {
 *   public baz = 'string';
 *   constructor() {
 *     super(42);
 *   }
 * }
 * @see https://github.com/stryker-mutator/stryker-js/issues/2314
 * @see https://github.com/stryker-mutator/stryker-js/issues/2474
 */
function isInvalidConstructorBody(blockStatement) {
    return !!(blockStatement.parentPath.isClassMethod() &&
        blockStatement.parentPath.node.kind === 'constructor' &&
        (containsTSParameterProperties(blockStatement.parentPath) || containsInitializedClassProperties(blockStatement.parentPath)) &&
        hasSuperExpressionOnFirstLine(blockStatement));
}
function containsTSParameterProperties(constructor) {
    return constructor.node.params.some((param) => types.isTSParameterProperty(param));
}
function containsInitializedClassProperties(constructor) {
    return (constructor.parentPath.isClassBody() &&
        constructor.parentPath.node.body.some((classMember) => types.isClassProperty(classMember) && classMember.value));
}
function hasSuperExpressionOnFirstLine(constructor) {
    return (types.isExpressionStatement(constructor.node.body[0]) &&
        types.isCallExpression(constructor.node.body[0].expression) &&
        types.isSuper(constructor.node.body[0].expression.callee));
}
//# sourceMappingURL=block-statement-mutator.js.map