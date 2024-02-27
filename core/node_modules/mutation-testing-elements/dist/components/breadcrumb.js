var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { toAbsoluteUrl } from '../lib/html-helpers';
import { View } from '../lib/router';
import { tailwind } from '../style';
let MutationTestReportBreadcrumbComponent = class MutationTestReportBreadcrumbComponent extends LitElement {
    get rootName() {
        switch (this.view) {
            case View.mutant:
                return 'All files';
            case View.test:
                return 'All tests';
        }
    }
    render() {
        return html `<nav class="my-6 flex rounded-md border border-gray-200 bg-primary-100 px-5 py-3 text-gray-700" aria-label="Breadcrumb">
      <ol class="inline-flex items-center">
        ${this.path && this.path.length > 0 ? this.renderLink(this.rootName, []) : this.renderActiveItem(this.rootName)}
        ${this.renderBreadcrumbItems()}
      </ol>
    </nav> `;
    }
    renderBreadcrumbItems() {
        if (this.path) {
            const path = this.path;
            return repeat(path, (item) => item, (item, index) => {
                if (index === path.length - 1) {
                    return this.renderActiveItem(item);
                }
                else {
                    return this.renderLink(item, path.slice(0, index + 1));
                }
            });
        }
        return undefined;
    }
    renderActiveItem(title) {
        return html `<li aria-current="page">
      <span class="ml-1 text-sm font-medium text-gray-800 md:ml-2">${title}</span>
    </li> `;
    }
    renderLink(title, path) {
        return html `<li class="after:text-gray-800 after:content-['/'] md:after:pl-1">
      <a
        href="${toAbsoluteUrl(this.view, ...path)}"
        class="ml-1 text-sm font-medium text-primary-800 underline hover:text-gray-900 hover:underline md:ml-2"
        >${title}</a
      >
    </li>`;
    }
};
MutationTestReportBreadcrumbComponent.styles = [tailwind];
__decorate([
    property()
], MutationTestReportBreadcrumbComponent.prototype, "path", void 0);
__decorate([
    property()
], MutationTestReportBreadcrumbComponent.prototype, "view", void 0);
MutationTestReportBreadcrumbComponent = __decorate([
    customElement('mte-breadcrumb')
], MutationTestReportBreadcrumbComponent);
export { MutationTestReportBreadcrumbComponent };
//# sourceMappingURL=breadcrumb.js.map