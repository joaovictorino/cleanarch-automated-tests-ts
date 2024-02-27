var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { renderIf } from '../../lib/html-helpers';
import { tailwind } from '../../style';
import { renderEmoji } from '../drawer-mutant/util';
import style from './drawer.component.scss';
export const DRAWER_HALF_OPEN_SIZE = 120;
let MutationTestReportDrawer = class MutationTestReportDrawer extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = 'closed';
        this.hasDetail = false;
        this.toggleReadMore = (event) => {
            if (this.mode === 'open') {
                this.mode = 'half';
            }
            else {
                this.mode = 'open';
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        };
    }
    get toggleMoreLabel() {
        switch (this.mode) {
            case 'half':
                return html `${renderEmoji('🔼', 'up arrow')} More`;
            case 'open':
                return html `${renderEmoji('🔽', 'down arrow')} Less`;
            case 'closed':
                return nothing;
        }
    }
    render() {
        return html `<aside @click="${(event) => event.stopPropagation()}">
      <div class="mx-6">
        <header class="w-full py-4">
          <h2>
            <slot name="header"></slot>
            ${renderIf(this.hasDetail, html `<button data-testId="btnReadMoreToggle" class="ml-2 align-middle" @click="${this.toggleReadMore}">${this.toggleMoreLabel}</button>`)}
          </h2>
        </header>
        <div class="scrollable container fixed motion-safe:transition-max-width">
          <slot name="summary"></slot>
          ${renderIf(this.hasDetail && this.mode === 'open', html `<slot name="detail"></slot>`)}
        </div>
      </div>
    </aside>`;
    }
};
MutationTestReportDrawer.styles = [unsafeCSS(style), tailwind];
__decorate([
    property({ reflect: true })
], MutationTestReportDrawer.prototype, "mode", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], MutationTestReportDrawer.prototype, "hasDetail", void 0);
__decorate([
    property()
], MutationTestReportDrawer.prototype, "toggleMoreLabel", null);
MutationTestReportDrawer = __decorate([
    customElement('mte-drawer')
], MutationTestReportDrawer);
export { MutationTestReportDrawer };
//# sourceMappingURL=drawer.component.js.map