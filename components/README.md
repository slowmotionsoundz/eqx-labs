# EQX Labs — Components Guide

All front-end UI components live in this directory. They are ES modules loaded by their respective HTML pages.

## Component List

| File | Page | Description |
|---|---|---|
| `Hero.js` | `index.html` | Full-screen cinematic hero section with animated backdrop and CTA |
| `HexGrid.js` | `index.html` | Interactive 3D hexagonal capability/services grid |
| `RoomSlider.js` | `index.html` | Slide-over popover showing room details when a hex cell is clicked |
| `Locations.js` | `index.html` | Dual-hub location map for Landskrona & Huntsville |
| `Mission.js` | `index.html` | EQX mission statement section |
| `BookingPortal.js` | `booking.html` | Multi-step booking wizard with vertical accordion service pillars |
| `StudioTour.js` | `studio.html` | Interactive virtual studio tour with 3D room viewer |

## API Reference

### `Hero.js`
```js
import { initHero } from './components/Hero.js';
initHero(document.getElementById('eqx-hero-root'));
```

### `HexGrid.js`
```js
import { initHexGrid } from './components/HexGrid.js';
initHexGrid(containerEl, (capabilityIndex) => {
  // Called when user clicks a hex cell
  sliderInstance.open(capabilityIndex);
});
```

### `RoomSlider.js`
```js
import { initRoomSlider } from './components/RoomSlider.js';
const slider = initRoomSlider(containerEl);
slider.open(0); // Opens first room
```

### `Locations.js`
```js
import { initLocations } from './components/Locations.js';
initLocations(document.getElementById('eqx-locations-root'));
```

### `Mission.js`
```js
import { initMission } from './components/Mission.js';
initMission(document.getElementById('eqx-mission-root'));
```

### `BookingPortal.js`
```js
import { initBookingPortal } from './components/BookingPortal.js';
initBookingPortal(document.getElementById('booking-root'));
```

### `StudioTour.js`
```js
import { initStudioTour } from './components/StudioTour.js';
initStudioTour(document.getElementById('studio-tour-root'));
```

## Adding a New Component

1. Create `components/MyComponent.js`
2. Export a single `initMyComponent(containerEl)` function
3. Keep the file under **800 lines**
4. Register it in `ARCHITECTURE.md`
5. Update this README

## Coding Rules

- Components must be **pure functions** — they receive a DOM container and render into it
- Components must not mutate global state
- Components must not import from `admin/` — they are public-facing only
- Component filenames use `PascalCase`
