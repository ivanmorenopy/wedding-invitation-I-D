---
description: "Builds and maintains the Denys & Ivan wedding invitation: a static one-page site (HTML, plain CSS, vanilla JS) on GitHub Pages."
mode: "primary"
temperature: 0.4
steps: 15
permission:
  bash: "allow"
  edit: "allow"
  webfetch: "allow"
  task:
    "*": "allow"
color: "#38bdf8"
---

You maintain a static, one-page wedding invitation hosted on GitHub Pages. Implement requests completely (no placeholders or TODOs), keep diffs small, and match the existing code.

## Project
- `index.html` holds all content, `styles.css` all styles, `script.js` all behavior. Media lives in `assets/{images,audio,video}`.
- No build step, frameworks, Tailwind, or npm packages; Google Fonts is the only external resource. Ask before adding any library or external service.
- Content is Spanish (`lang="es"`), and so is most naming (`.sobre-container`, `abrirInvitacion()`). Follow suit.
- `confirmacion-asistencia/` is a separate Google Apps Script app (`Codigo.cs` is Apps Script; `index.html` uses `<? ?>` template tags). It runs on Apps Script, not Pages; leave it alone unless asked.

## How it fits together
- Opening the `#portada` envelope runs `abrirInvitacion()`, which un-hides every `.section` and starts music, video, and confetti. Sections get `.visible` as they scroll into view.
- New section: `<section id="x" class="section x hidden">` with an `<h2 class="section-title">`. For the floating nav, copy a `.nav-btn` into `#navFlotante` with `data-section="x"`, and add `'x'` to the `secciones` array in `actualizarNavegacionActiva()`.
- New modal: copy the `.modal-overlay` pattern (`hidden` attribute, `role="dialog"`, `aria-modal="true"`, close button, closes on Esc and overlay click, focuses the close button on open).
- `script.js` uses elements without null checks. When you remove or rename an id/class in `index.html`, update `script.js`, or every feature after it breaks.
- The wedding date/time is repeated in `index.html` (texts, footer, Google Calendar link in UTC) and in `fechaBoda` in `script.js`. Change them together.

## Rules
- **Design Style** read the Design-Style-Overview.md file for rules that must be applied and used.
- **CSS:** use the `:root` variables (`--color-*`, `--rgb-*`, `--font-titulo`, `--font-cuerpo`, `--transition-suave`); no new hardcoded colors or fonts. Put styles under the matching banner comment. Responsive tweaks go in the existing `max-width: 768px` / `480px` queries; phones are the main audience.
- **JS:** vanilla ES6+, `const`/`let`, `addEventListener`. Add code inside the existing `DOMContentLoaded` handler under its own `// ====` banner.
- **HTML:** semantic elements, one `<h1>`, no skipped heading levels. `<button type="button">` for actions, `<a>` for links. No inline `style` or `on*` attributes.
- **Accessibility (WCAG 2.1 AA):** `alt` on every image (`alt=""` if decorative); `aria-label` on icon-only buttons, `aria-hidden="true"` on decorative SVGs; toggles update `aria-expanded`/`aria-pressed`; everything works by keyboard with visible focus. The global `prefers-reduced-motion` block covers CSS motion; JS-driven motion must check it.
- **Images:** set `width` and `height`; `loading="lazy"` below the fold.
- **Paths:** relative (`assets/...`), never starting with `/`. Leave `CNAME` (custom domain) alone.
- **Content:** never change names, dates, addresses, phone numbers, or bank aliases unless asked.

## Before finishing
Check that every id, class, and asset path you touched still matches across `index.html`, `styles.css`, and `script.js`. Then tell the user what to verify in the browser at phone and desktop widths.
