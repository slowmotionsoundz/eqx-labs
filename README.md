# EQX Labs

A premium multi-location creative studio and technology consultancy platform serving clients across Scandinavia and North America (Landskrona, SE · Huntsville, AL).

## What Is This?

EQX Labs is the public-facing web platform and internal operations suite for EQX Europe. It includes:

- **Public Website** (`index.html`) — Scandinavian-minimal showcase with hero, services hex grid, room slider, locations, and mission.
- **Booking Portal** (`booking.html`) — Multi-step reservation wizard for studio rooms, sessions, and packages.
- **Studio Page** (`studio.html`) — Virtual studio tour and room capability explorer.
- **Admin Operations Suite** (`crm.html`) — Internal dashboard for managing leads, projects, contacts, bookings, to-dos, and settings.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (ES Modules) |
| Styling | Vanilla CSS with CSS custom properties |
| Fonts | Google Fonts (Cormorant Garamond, Inter) |
| Auth | Firebase Authentication (Google OAuth) |
| Database | Firebase Firestore (optional live sync) |
| Calendar | Google Calendar API (auto-sync on bookings) |
| Hosting | Local dev server (`npx serve .`) |

## Quick Start

```bash
# Clone or open the project directory
cd eqx-labs

# Start local dev server (no build step needed)
npx serve .

# Open in browser
open http://localhost:3000
```

## Project Structure

```
eqx-labs/
├── index.html          # Homepage
├── booking.html        # Booking portal
├── studio.html         # Studio page
├── crm.html            # Admin operations suite
├── main.js             # Homepage JS entrypoint
│
├── css/                # Modular stylesheets
│   ├── base.css        # Variables, reset, typography
│   ├── layout.css      # Header, nav, footer, grids
│   ├── components.css  # Shared UI components
│   ├── animations.css  # Keyframes & motion
│   └── pages/          # Per-page styles
│
├── admin/              # Admin portal JS modules
│   └── index.js        # Entrypoint
│
├── js/                 # Shared JS utilities
│   ├── firebase-db.js  # Firebase helpers
│   ├── auth.js         # Auth gate
│   ├── gcal.js         # Google Calendar API
│   ├── tour.js         # Onboarding tour
│   ├── ui.js           # Shared UI utilities
│   └── media.js        # Media playback
│
└── components/         # Front-end UI components
    ├── Hero.js
    ├── HexGrid.js
    ├── RoomSlider.js
    ├── BookingPortal.js
    ├── StudioTour.js
    ├── Locations.js
    └── Mission.js
```

## File Size Rules

All files in this codebase must stay **under 800 lines**. This is enforced by the modular architecture. If a file grows beyond 800 lines, split it.

## Coding Conventions

- No inline `<style>` or `<script>` blocks in HTML files
- CSS custom properties live only in `css/base.css`
- Each JS module exports only what it needs — nothing else
- All shared data types are defined in `admin/data.js`
- Use `localStorage` for client-side persistence in the admin portal

## Contacts

- **Admin email:** slowmotion767@gmail.com
- **Firebase project:** eqxxx-crm
