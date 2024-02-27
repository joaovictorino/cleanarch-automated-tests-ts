import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export function renderDots(dots, finalDots) {
    if (dots === nothing && finalDots === nothing) {
        return nothing;
    }
    else {
        return html `<span class="ml-1 flex flex-row items-center">${dots}${finalDots}</span>`;
    }
}
export function renderLine(line, dots) {
    return html `<tr class="line"
    ><td class="line-number"></td><td class="line-marker"></td><td class="code flex"><span>${unsafeHTML(line)}</span>${dots}</td></tr
  >`;
}
//# sourceMappingURL=util.js.map