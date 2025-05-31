# CHANGELOG

All notable changes to this project will be documented in this file.


## [2025-05-31]

- **Fix various UI issues and enhance the example app with better styling, placeholder images, syntax highlighting, search functionality, and other improvements.** (11 subtasks completed)
  - Remove @shadcn/ui text from all cards on the /showcase page in the example app (./examples). Check all component cards and remove any references to @shadcn/ui since React Jedi is its own SDUI library. Update card titles and descriptions to only reference React Jedi components.
  - Update all images in the example app (./examples) to use placeholder images from https://placehold.co service. Replace broken or missing images with URLs like https://placehold.co/600x400/EEE/31343C where 600 is width and 400 is height. Check all pages including showcase pages, component examples, and any other pages with images. Ensure consistent placeholder image sizes appropriate for each context.
  - On the /showcase page in the example app (./examples), some cards only have text like 'Data Table - Advanced sortable table' without actual component examples. Find all such text-only cards and either add proper SDUI component examples to them or create links to their respective showcase pages if they exist. Ensure all cards on /showcase have consistent presentation.
  - Fix the /documentation page header in the example app (./examples) to remove excessive purple and other colors. Make the header consistent with other pages in the app - use the same color scheme, styling, and layout as pages like /showcase or /examples. Ensure clean, professional appearance without random color variations.
  - Fix all nested documentation pages (e.g., /documentation/getting-started) in the example app (./examples). Issues to fix: 1) Remove 100% width that makes content stretch edge-to-edge, 2) Remove random colors like green that don't match the app's design system, 3) Add a proper documentation layout with sidebar navigation, 4) Add previous/next navigation buttons, 5) Ensure consistent styling with main documentation page. Make it look like standard documentation sites.
  - Fix the floating side menu on the /examples page in the example app (./examples). The menu gets cut off by the fixed header. Add proper offset/margin-top to account for the header height so the floating menu is fully visible and doesn't overlap with or get hidden behind the header.
  - Add a syntax highlighting plugin (like Prism.js or highlight.js) to the example app (./examples) for code and JSON examples. Apply syntax highlighting to: 1) Code blocks on the /documentation page, 2) All JSON examples on the /showcase page, 3) All JSON code on individual showcase pages (e.g., /showcase/button, /showcase/group), 4) Any other code snippets throughout the app. Ensure consistent and attractive code formatting.
  - Investigate and confirm that the main @banja/react-jedi library styles are being properly loaded in the example app (./examples). Check: 1) Import statements for library styles, 2) Build configuration, 3) Console for any style loading errors, 4) Verify components are rendering with proper styles from the SDUI library. Fix any issues preventing library styles from loading correctly.
  - Confirm the example app (./examples) is set up to not be indexable by search engines. Check for: 1) robots.txt file with proper disallow rules, 2) Meta tags with noindex/nofollow in HTML head, 3) Any other SEO prevention measures. Add any missing configurations to ensure the example app is not indexed by search engines.
  - Add a search component to the header in the example app (./examples) with real-time search results. Requirements: 1) Search input that looks sexy and matches the app design, 2) Real-time filtering as user types, 3) Search through all pages/routes in the app, 4) Show results in a dropdown (e.g., typing 'bo' shows 'Box' page), 5) Clicking a result navigates to that page, 6) Include keyboard navigation support, 7) Style it to look modern and professional.
  - Change the hardcoded '2024' year in the footer of the example app (./examples) to dynamically show the current year using JavaScript's new Date().getFullYear(). Find all instances of hardcoded 2024 in the footer and replace with dynamic year generation.
- **Fix various styling issues in the example app to improve consistency and user experience** (7 subtasks completed)
  - On the Homepage in the Getting Started section, ensure all code examples use our syntax highlighting component for consistent code presentation
  - Remove the gradient/weird style effect on the /documentation page header. Use standard header styling consistent with other pages like /examples. Apply this to all documentation/* pages
  - Replace the horizontal navigation bar on /documentation with a vertical sidebar navigation (standard for doc sites like https://magicui.design/docs)
  - Fix weird styling on nested documentation pages (documentation/*): remove green headers (use dark theme), remove weird underlines/overlines, fix button gradients (see /documentation/layout-components), fix container styling. Ensure clean, consistent UI matching our home page styles
  - On the /showcase page, apply syntax highlighting to the show/hide JSON feature for each component using our syntax highlighting component
  - On the /examples page, change the floating menu color from purple to violet/blue to maintain consistency (we don't use blue elsewhere)
  - On the /examples page, remove all 'new' and 'stable' badges from components. Everything will be in the initial release


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

