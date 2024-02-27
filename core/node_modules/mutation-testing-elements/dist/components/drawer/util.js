import { html } from 'lit';
export const renderDrawer = ({ hasDetail, mode }, content) => html `<mte-drawer
    class="container fixed bottom-0 z-10 overflow-hidden rounded-t-3xl bg-gray-200/60 shadow-xl backdrop-blur-lg motion-safe:transition-[height,max-width] motion-safe:duration-200"
    ?hasDetail=${hasDetail}
    .mode="${mode}"
  >
    ${content}
  </mte-drawer>`;
//# sourceMappingURL=util.js.map