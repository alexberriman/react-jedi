import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docPath = '/home/alex/Documents/repos/react-jedi/examples/src/pages/documentation/documentation-page.tsx';
const sectionsDir = '/home/alex/Documents/repos/react-jedi/examples/src/pages/documentation/sections';

// Read the file
const content = fs.readFileSync(docPath, 'utf8');
const lines = content.split('\n');

// Define sections
const sections = [
  { id: 'layout-components', name: 'LayoutComponents', filename: 'layout-components' },
  { id: 'typography', name: 'Typography', filename: 'typography' },
  { id: 'ui-components', name: 'UIComponents', filename: 'ui-components' },
  { id: 'form-components', name: 'FormComponents', filename: 'form-components' },
  { id: 'theming', name: 'Theming', filename: 'theming' },
  { id: 'state-management', name: 'StateManagement', filename: 'state-management' },
  { id: 'complex-examples', name: 'ComplexExamples', filename: 'complex-examples' },
  { id: 'performance', name: 'Performance', filename: 'performance' },
];

// Find section boundaries
function findSection(id) {
  const startRegex = new RegExp(`<section id="${id}"`);
  const endRegex = /<\/section>/;
  
  let startIndex = -1;
  let endIndex = -1;
  let depth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (startRegex.test(lines[i]) && startIndex === -1) {
      startIndex = i;
      depth = 1;
      continue;
    }
    
    if (startIndex !== -1) {
      if (lines[i].includes('<section')) {
        depth++;
      }
      if (endRegex.test(lines[i])) {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
  }
  
  return { startIndex, endIndex };
}

// Extract and create files
sections.forEach(section => {
  const { startIndex, endIndex } = findSection(section.id);
  
  if (startIndex === -1 || endIndex === -1) {
    console.log(`Section ${section.id} not found`);
    return;
  }
  
  const sectionContent = lines.slice(startIndex, endIndex + 1).join('\n');
  
  // Transform to React component
  const componentContent = `export function ${section.name}Page() {
  return (
    ${sectionContent.trim().replace(/className="mb-20 scroll-mt-32"/, 'className="mb-20"')}
  );
}`;
  
  // Write file
  const filePath = path.join(sectionsDir, `${section.filename}.tsx`);
  fs.writeFileSync(filePath, componentContent);
  console.log(`Created ${filePath}`);
});

// Update index file
const indexContent = sections
  .map(s => `export { ${s.name}Page } from "./${s.filename}";`)
  .join('\n');

const existingExports = `export { GettingStartedPage } from "./getting-started";
export { ComponentSystemPage } from "./component-system";
`;

fs.writeFileSync(
  path.join(sectionsDir, 'index.ts'),
  existingExports + indexContent
);

console.log('All sections extracted successfully');