export function createCustomEvent(eventName, detail, opts) {
    return new CustomEvent(eventName, { detail, ...opts });
}
//# sourceMappingURL=custom-events.js.map