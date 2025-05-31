# CHANGELOG

All notable changes to this project will be documented in this file.


## [2025-05-31]

- **Additional UI/UX fixes for the example app (./examples) to improve usability and consistency** (5 subtasks completed)
  - Remove the 'React Jedi Documentation' hero section on the /documentation page in the example app (./examples). This includes the purple/gradient background section with 'Get Started' and 'View Components' buttons. Keep only the clean documentation content below.
  - Add previous/next navigation buttons at the bottom of each documentation page in the example app (./examples). Style them nicely to match the app design. First page (Getting Started) should only have 'Next' button leading to Component System. Last page should only have 'Previous' button. All other pages should have both. Include page titles in the buttons.
  - Fix the floating navigation bar on the /showcase page in the example app (./examples). The floating nav is hidden behind the fixed header. Add proper top offset/margin to account for the fixed header height so the floating navigation is fully visible and accessible.
  - Investigate why styles from the main library (./src) aren't being applied in the example app (./examples). All buttons appear black instead of styled. Check: 1) Import paths for @banja/react-jedi styles, 2) Build process and dist folder, 3) Vite config for style handling, 4) Console errors, 5) Whether library CSS is being bundled correctly. Fix the root cause to ensure SDUI components render with proper styling.
  - Update the root README.md file. Analyze the entire repository structure and create a simple, sexy, straightforward README with: 1) Clear project description, 2) Table of contents, 3) Installation instructions, 4) Quick start guide, 5) Key features, 6) Examples, 7) Documentation links, 8) Contributing guidelines. Make it professional and appealing for developers discovering the project.


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

