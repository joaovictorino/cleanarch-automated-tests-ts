import { LitElement, nothing } from 'lit';
export type DrawerMode = 'open' | 'half' | 'closed';
export declare const DRAWER_HALF_OPEN_SIZE = 120;
export declare class MutationTestReportDrawer extends LitElement {
    static styles: import("lit").CSSResult[];
    mode: DrawerMode;
    hasDetail: boolean;
    get toggleMoreLabel(): import("lit-html").TemplateResult<1> | typeof nothing;
    toggleReadMore: (event: MouseEvent) => void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=drawer.component.d.ts.map