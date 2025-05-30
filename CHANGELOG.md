# CHANGELOG

All notable changes to this project will be documented in this file.


## [2025-05-30]

- **Polish and improve the example app (./examples) user experience, navigation, and overall design quality. Remove redundant pages, fix UI issues, and enhance the documentation and performance pages.** (12 subtasks completed)
  - Fix the header dropdown menu in the example app (./examples) - it's glitchy when you click on parent items with children. Clicking on parent items should have no effect (only hover should trigger show/hide). Also add cursor-pointer styling to interactive elements.
  - Remove the 'Interactive Components Now Available!' container at the bottom of the /showcase page in the example app (./examples).
  - Remove the 'Advanced Layout Components' page (/showcase/layout) from the example app (./examples) since we've added detailed pages for every component. Also remove this link from the header navigation.
  - Remove the '/showcase/overlay-interactive' page ('Interactive Overlay Components') from the example app (./examples) as we've created detailed pages for each component. Also remove this link from the header navigation.
  - Remove the '/showcase/interactive' page ('Interactive Component Showcase') from the example app (./examples). Also remove this link from the header navigation.
  - Redesign the /examples page in the example app (./examples) to look nicer. The current box/card layout doesn't work well with many items. Create a cleaner, more organized layout.
  - Remove the '/examples/form-validation' page from the example app (./examples) and also remove it from the header navigation.
  - Remove the '/examples/landing' page from the example app (./examples) and also remove it from the header navigation.
  - Remove the '/examples/navigation' page from the example app (./examples) and also remove it from the header navigation.
  - Move the Documentation page to the first link in the header menu (before components) in the example app (./examples). Redesign it to look way nicer and more like a traditional documentation page. Add syntax highlighting for JSON/TypeScript code using a 3rd party plugin. Break content into logical sections (Introduction, Getting Started, etc.). Avoid content duplication by linking to existing pages. Make the documentation look professional and sexy.
  - Redesign the /performance page in the example app (./examples) to look way nicer with clean, simple, flat, and sexy UI design.
  - Update the footer menu in the example app (./examples) to be current and reflective of the updated site structure after removing and reorganizing pages.

