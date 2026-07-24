# Changelog

All notable changes to EQX Labs are documented here.

## [2.0.0] — July 2026

### Architecture
- **Componentized codebase** — split all files to ≤800 lines, organized into `css/`, `admin/`, `js/`, and `components/` directories
- **CSS modularized** — `style.css` (4,964 lines) split into 8 focused stylesheets loaded per-page
- **Admin portal rewritten** — `js/crm.js` (3,662 lines) replaced by 9 clean ES modules in `admin/`
- **Documentation added** — `README.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `admin/README.md`, `components/README.md`, `css/README.md`

### Admin Portal (`crm.html`)
- Complete rewrite as self-contained, dependency-free admin portal
- Dashboard with live project cards, session roadmap, and KPI stats
- Leads pipeline with add/remove/status management
- Projects tracker with progress bars and category tags
- Contacts address book
- Bookings view (populated from booking portal)
- To-do list with checkbox completion
- Settings panel with live toggles

### Booking Portal (`booking.html`)
- Fey-style vertical accordion pillars for service selection
- Step 1 → Step 2 → Checkout wizard flow
- Google Calendar auto-sync on new reservations
- iCal `.ics` file download support

### Google Calendar Integration
- Automatic event push on every new studio booking
- Background REST API sync via `js/gcal.js`
- OAuth token captured on admin sign-in

### Admin UI Redesign
- 3-column Tasky-inspired layout (sidebar · main canvas · right aside)
- Compact icon sidebar with tooltip labels
- Profile card with live stats
- Studio stream activity feed

---

## [1.5.0] — July 2026

### Added
- Google Calendar API integration (`js/gcal.js`)
- Booking portal vertical accordion pillars
- Admin portal 3-column layout redesign
- Booking & Reservations tab in admin CRM

### Fixed
- Centered hero header alignment on `booking.html`

---

## [1.0.0] — July 2026

### Initial Release
- Public homepage with hero, hex grid services, room slider, locations, mission
- Booking portal with multi-step wizard
- Studio page with virtual room tour
- Admin CRM portal with leads, projects, contacts, and financials management
- Firebase Firestore integration for real-time data sync
- Firebase Authentication with Google OAuth admin gate
