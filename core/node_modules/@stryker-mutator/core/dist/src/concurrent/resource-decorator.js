export class ResourceDecorator {
    constructor(producer) {
        this.producer = producer;
        this.innerResource = producer();
    }
    async init() {
        var _a, _b;
        await ((_b = (_a = this.innerResource).init) === null || _b === void 0 ? void 0 : _b.call(_a));
    }
    async dispose() {
        var _a, _b;
        await ((_b = (_a = this.innerResource).dispose) === null || _b === void 0 ? void 0 : _b.call(_a));
    }
    /**
     * Disposes the current test runner and creates a new one
     * To be used in decorators that need recreation.
     */
    async recover() {
        await this.dispose();
        this.innerResource = this.producer();
        return this.init();
    }
}
//# sourceMappingURL=resource-decorator.js.map