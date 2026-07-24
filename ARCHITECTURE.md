# EQX Labs — Architecture Guide

## Module Map

```
                        ┌─────────────────────────────┐
                        │         index.html           │
                        │         (Homepage)           │
                        └──────────┬──────────────────┘
                                   │ imports
                          main.js (entrypoint)
                          │    │    │    │    │
                    Hero  Hex  Room Loc  Mission
                    .js  Grid  Slider .js  .js
                         .js   .js

                        ┌─────────────────────────────┐
                        │        booking.html          │
                        └──────────┬──────────────────┘
                                   │ imports
                          components/BookingPortal.js
                          js/gcal.js (calendar sync)

                        ┌─────────────────────────────┐
                        │         studio.html          │
                        └──────────┬──────────────────┘
                                   │ imports
                          components/StudioTour.js

                        ┌─────────────────────────────┐
                        │          crm.html            │
                        │       (Admin Portal)         │
                        └──────────┬──────────────────┘
                                   │ imports
                          admin/index.js (entrypoint)
                          │    │    │    │    │    │    │    │
                       data tabs dash leads proj cont book todo
                        .js  .js  .js   .js  .js  .js  .js  .js
```

---

## CSS Layer Architecture

Styles are loaded per-page. Each HTML file only loads the CSS it needs:

```
css/base.css        →  All pages (variables, reset)
css/components.css  →  All pages (shared UI)
css/layout.css      →  All pages (header, nav, footer)
css/animations.css  →  All pages (motion)
css/pages/home.css     →  index.html only
css/pages/booking.css  →  booking.html only
css/pages/studio.css   →  studio.html only
css/pages/admin.css    →  crm.html only
```

---

## Admin Portal Data Flow

```
User Action (click button)
        │
        ▼
admin/index.js  (window globals, event bindings)
        │
        ▼
admin/leads.js | admin/projects.js | etc.  (CRUD functions)
        │
        ▼
admin/data.js  (shared state: leads[], projects[], save())
        │
        ▼
localStorage  (persistence)
```

---

## Naming Conventions

### Files
- `kebab-case` for all file and directory names
- `PascalCase.js` for component files in `components/`
- `camelCase.js` for utility and module files in `js/` and `admin/`

### CSS Classes
- `.eqx-` prefix for global structural classes (`.eqx-header`, `.eqx-nav`)
- `.tasky-` prefix for admin portal layout classes
- `.card`, `.panel`, `.btn` for generic shared components
- `.pill-*`, `.badge-*` for status indicators

### JavaScript
- `render*()` — functions that write to the DOM (e.g., `renderLeads()`)
- `add*()` / `delete*()` / `toggle*()` — CRUD action functions
- `init*()` — initialization functions called once on page load
- `handle*()` — event handler functions (e.g., `handleSearch()`)

---

## Component Contracts

### `components/Hero.js`
```js
initHero(containerEl)
// Renders the hero section into containerEl
// No return value
```

### `components/HexGrid.js`
```js
initHexGrid(containerEl, onCellClick: (index: number) => void)
// Renders the capability hex grid
// Calls onCellClick with the cell index when a hex is clicked
```

### `components/RoomSlider.js`
```js
const slider = initRoomSlider(containerEl)
slider.open(index: number)  // Opens the room popover to a specific room
```

### `components/BookingPortal.js`
```js
initBookingPortal(containerEl)
// Mounts the multi-step booking wizard
```

### `components/StudioTour.js`
```js
initStudioTour(containerEl)
// Mounts the interactive studio tour
```

---

## Admin Module API

### `admin/data.js`
```js
export let leads, projects, contacts, tasks, bookings
export function save()   // Persists all state to localStorage
```

### `admin/tabs.js`
```js
export function switchTab(name: string, buttonEl: HTMLElement)
```

### `admin/dashboard.js`
```js
export function renderDashboard()
export function categoryLabel(category: string): string
```

### `admin/leads.js`
```js
export function renderLeads(filter?: string)
export function addLead()     // Reads from DOM inputs, validates, saves
export function deleteLead(id: string)
```

### `admin/projects.js`
```js
export function renderAllProjects()
export function addProject()
export function deleteProject(id: string)
```

### `admin/contacts.js`
```js
export function renderContacts()
```

### `admin/bookings.js`
```js
export function renderBookings()
```

### `admin/todos.js`
```js
export function renderTodos()
export function toggleTask(id: string)
```

### `admin/index.js`
```js
// No exports — sets up all window globals and boots on load
// window.addLead, window.addProject, window.deleteLead,
// window.deleteProject, window.toggleTask, window.switchTab,
// window.openModal, window.closeModal, window.handleSearch, window.toast
```

---

## Key Design Decisions

1. **No build step** — The project uses native ES modules loaded via `<script type="module">`. No Webpack, Vite, or bundler required.
2. **localStorage over Firebase by default** — Firebase is optional. Everything works offline with localStorage. Firebase sync can be enabled in Settings.
3. **Self-contained admin portal** — `crm.html` + `admin/` is intentionally decoupled from the public site JS (`main.js`, `components/`) to keep concerns separate.
4. **CSS custom properties only in `base.css`** — No other file defines `:root` variables. All other files consume them via `var(--name)`.
