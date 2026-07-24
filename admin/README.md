# EQX Admin CRM — ES Module Architecture

This directory contains the modular JavaScript codebase for the EQX Admin CRM portal.

## Module Structure

- **`index.js`**: Main entrypoint script. Sets up modal open/close handlers, global search handler, toast notification utility, exposes module functions onto the global `window` object for HTML inline handlers, and triggers initial dashboard rendering.
- **`data.js`**: Data layer containing default seed datasets (`defaultLeads`, `defaultProjects`, `defaultContacts`, `defaultTasks`, `defaultBookings`), state variables initialized from `localStorage`, and the `save()` persistence function.
- **`tabs.js`**: Tab navigation module providing `switchTab()` and `renderTab()` dispatching logic across all tab views.
- **`dashboard.js`**: Dashboard view renderer (`renderDashboard()`) and category label formatter (`categoryLabel()`).
- **`leads.js`**: Sales pipeline management module providing `renderLeads()`, `addLead()`, and `deleteLead()`.
- **`projects.js`**: Active project management module providing `renderAllProjects()`, `addProject()`, and `deleteProject()`.
- **`contacts.js`**: Address book module providing `renderContacts()` for studio contact listings.
- **`bookings.js`**: Reservations module providing `renderBookings()` for studio session timeline views.
- **`todos.js`**: Task management module providing `renderTodos()` and `toggleTask()` for checking off to-do items.
- **`settings.js`**: System settings module providing `renderSettings()` stub for HTML-driven configuration controls.
