# Modern Web Guidance

Use modern, semantic web standards for building layouts and interactions:

## Layouts & Structure
- Prefer CSS Grid and Flexbox for all layout containers.
- Use CSS nesting for clean, readable stylesheet structures.
- Define container queries (`container-type: inline-size`) for components that need to respond to their container width instead of the viewport.

## Motion & Interactive States
- Use standard CSS variables for all transition timings.
- Implement hover states with subtle 3D translations and box-shadow depth modifications.
- Leverage the Popover API (`popover` attribute) and `<dialog>` elements for overlay overlays, rather than custom JavaScript click interceptors.
- Keep performance high by animating only `transform` and `opacity` properties.
