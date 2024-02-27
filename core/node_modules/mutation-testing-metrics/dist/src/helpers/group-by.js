"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
function groupBy(arr, criteria) {
    return arr.reduce((acc, item) => {
        const key = criteria(item);
        if (!Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
}
exports.groupBy = groupBy;
//# sourceMappingURL=group-by.js.map