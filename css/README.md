# EQX Labs Modular CSS Architecture

This directory contains the modularized CSS architecture for EQX Labs, refactored from the original monolithic `style.css`. All stylesheet files are organized by concern and strictly capped at **≤800 lines per file** for maximum maintainability.

---

## 📁 File Structure & Responsibilities

| File Path | Description & Purpose |
| :--- | :--- |
| **`css/base.css`** | CSS custom properties (`:root` dark & light theme variables), CSS reset rules (`*`, `html`, `body`), base typography, utility classes, and custom scrollbar styles. |
| **`css/layout.css`** | Global structural layouts, header/navigation bar (`.eqx-header`), logo branding, footer (`.eqx-footer`), and core responsive layout breakpoints. |
| **`css/components.css`** | Shared reusable UI components: buttons (`.btn-primary`, `.btn-ghost`, `.clay-button`), cards (`.glass-panel`, `.neu-card`), modals (`.eqx-popover`), forms, alerts, badges, and gauge dials. |
| **`css/animations.css`** | Keyframe animations (`@keyframes`), transition curves, scroll reveal effects (`.reveal`), and micro-interactions. |
| **`css/pages/home.css`** | Page-specific styles for `index.html` (Homepage hero, 3D Hexagon grid, Apidura mission section, locations & dual-core hubs). |
| **`css/pages/booking.css`** | Page-specific styles for `booking.html` (Booking portal hero section, service category tabs, card grid, and modal checkout form). |
| **`css/pages/booking-wizard.css`** | Guided booking wizard steps, Fey-style vertical accordion pillars, step navigation, and detailed service selection rows. |
| **`css/pages/studio.css`** | Page-specific styles for `studio.html` (Interactive scroll-canvas animation track, phases overlay, and 3D stage viewer container). |
| **`css/pages/admin.css`** | CRM & Admin portal base dashboard layout (`.crm-layout`), sidebar navigation, header controls, metric summary cards, and stealth admin FAB drawer. |
| **`css/pages/admin-pipeline.css`** | CRM deal pipeline column grid, drag-and-drop lead cards, status color indicators, lead details slide-over panel, and interaction history logs. |
| **`css/pages/admin-widgets.css`** | CRM calendar scheduler, contacts directory, multi-room calendar grid, and project management stage tracking. |
| **`css/pages/admin-tools.css`** | CRM collaborative audio file review player (waveform canvas & comment markers), financials table & quotes, to-dos checklist, interactive tour tutorial UI, and mobile responsiveness overrides. |

---

## 📄 HTML Page CSS Inclusion Table

When including stylesheets in HTML documents, import `base.css`, `layout.css`, `components.css`, and `animations.css` first, followed by the relevant page-specific CSS file(s):

| HTML Page | Required CSS Files to Include |
| :--- | :--- |
| **`index.html`** (Homepage) | `css/base.css`<br>`css/layout.css`<br>`css/components.css`<br>`css/animations.css`<br>`css/pages/home.css` |
| **`studio.html`** (Studio Page) | `css/base.css`<br>`css/layout.css`<br>`css/components.css`<br>`css/animations.css`<br>`css/pages/studio.css` |
| **`booking.html`** (Booking Page) | `css/base.css`<br>`css/layout.css`<br>`css/components.css`<br>`css/animations.css`<br>`css/pages/booking.css`<br>`css/pages/booking-wizard.css` |
| **`admin.html`** / CRM Dashboard | `css/base.css`<br>`css/layout.css`<br>`css/components.css`<br>`css/animations.css`<br>`css/pages/admin.css`<br>`css/pages/admin-pipeline.css`<br>`css/pages/admin-widgets.css`<br>`css/pages/admin-tools.css` |

---

## 🛠️ Editing Guidelines

1. **Global Variables & Themes**: Edit `css/base.css` when adding or modifying CSS custom properties (`:root` or `[data-theme="light"]`).
2. **Global Navigation & Footer**: Edit `css/layout.css` to update headers, nav bars, or footers used site-wide.
3. **Buttons, Cards & Modals**: Edit `css/components.css` to update buttons, inputs, badges, or shared modal overlays.
4. **Keyframe Animations**: Edit `css/animations.css` to add or update `@keyframes` or motion timing curves.
5. **Page Specific Features**: Edit the corresponding file in `css/pages/` when modifying page-specific layouts or unique section components. Ensure files stay strictly ≤800 lines.
