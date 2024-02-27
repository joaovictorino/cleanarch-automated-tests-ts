var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tailwind } from '../../style';
let MutationTestReportThemeSwitchComponent = class MutationTestReportThemeSwitchComponent extends LitElement {
    render() {
        return html `<span class="cursor-help underline decoration-dotted" title="${this.title}"><slot></slot></span>`;
    }
};
MutationTestReportThemeSwitchComponent.styles = [tailwind];
__decorate([
    property({ attribute: true })
], MutationTestReportThemeSwitchComponent.prototype, "title", void 0);
MutationTestReportThemeSwitchComponent = __decorate([
    customElement('mte-tooltip')
], MutationTestReportThemeSwitchComponent);
export { MutationTestReportThemeSwitchComponent };
//# sourceMappingURL=tooltip.component.js.map