var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createCustomEvent } from '../../lib/custom-events';
import { tailwind } from '../../style';
import style from './theme-switch.scss';
let MutationTestReportThemeSwitchComponent = class MutationTestReportThemeSwitchComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.dispatchThemeChangedEvent = (e) => {
            const checked = e.target.checked;
            this.dispatchEvent(createCustomEvent('theme-switch', checked ? 'dark' : 'light'));
        };
    }
    render() {
        return html `
      <div class="check-box-container" @click="${(event) => event.stopPropagation()}">
        <input type="checkbox" @click="${this.dispatchThemeChangedEvent}" ?checked="${this.theme == 'dark'}" id="darkTheme" />
        <label for="darkTheme">Dark</label>
      </div>
    `;
    }
};
MutationTestReportThemeSwitchComponent.styles = [tailwind, unsafeCSS(style)];
__decorate([
    property()
], MutationTestReportThemeSwitchComponent.prototype, "theme", void 0);
MutationTestReportThemeSwitchComponent = __decorate([
    customElement('mte-theme-switch')
], MutationTestReportThemeSwitchComponent);
export { MutationTestReportThemeSwitchComponent };
//# sourceMappingURL=theme-switch.component.js.map