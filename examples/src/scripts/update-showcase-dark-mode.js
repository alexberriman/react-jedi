import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Update multiple showcase pages
const pages = [
  "../pages/showcase/showcase-page.tsx",
  "../pages/showcase/interactive-showcase-page.tsx",
  "../pages/examples/examples-page.tsx",
  "../pages/documentation/documentation-page.tsx"
];

pages.forEach(page => {
  const pagePath = join(__dirname, page);
  try {
    let content = readFileSync(pagePath, "utf8");
    
    // Update section backgrounds
    content = content.replace(
      /className="mb-8"/g,
      'className="mb-8"'
    );
    
    // Update card backgrounds
    content = content.replace(
      /className="bg-zinc-800 rounded-lg p-6"/g,
      'className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-transparent shadow-lg transition-all"'
    );
    
    // Update headings
    content = content.replace(
      /<h1 className="text-3xl font-bold mb-6">/g,
      '<h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white transition-colors">'
    );
    
    content = content.replace(
      /<h2 className="text-2xl font-bold mb-4">/g,
      '<h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white transition-colors">'
    );
    
    content = content.replace(
      /<h3 className="text-xl font-semibold mb-2">/g,
      '<h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white transition-colors">'
    );
    
    // Update text colors
    content = content.replace(
      /<p className="text-zinc-300/g,
      '<p className="text-zinc-700 dark:text-zinc-300'
    );
    
    // Update status badges
    content = content.replace(
      /className="px-2 py-1 text-xs rounded-md bg-emerald-500\/20 text-emerald-400"/g,
      'className="px-2 py-1 text-xs rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 transition-colors"'
    );
    
    content = content.replace(
      /className="px-2 py-1 text-xs rounded-md bg-yellow-500\/20 text-yellow-400"/g,
      'className="px-2 py-1 text-xs rounded-md bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 transition-colors"'
    );
    
    content = content.replace(
      /className="px-2 py-1 text-xs rounded-md bg-zinc-500\/20 text-zinc-400"/g,
      'className="px-2 py-1 text-xs rounded-md bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 transition-colors"'
    );
    
    // Update code blocks
    content = content.replace(
      /className="bg-zinc-900 p-4 rounded-lg overflow-x-auto"/g,
      'className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto border border-zinc-200 dark:border-transparent transition-all"'
    );
    
    content = content.replace(
      /<code className="text-sm text-zinc-300">/g,
      '<code className="text-sm text-zinc-800 dark:text-zinc-300">'
    );
    
    // Update component cards
    content = content.replace(
      /className="bg-zinc-800 p-8 rounded-lg border border-zinc-700"/g,
      'className="bg-white dark:bg-zinc-800 p-8 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg transition-all"'
    );
    
    // Update category sections
    content = content.replace(
      /className="border-b border-zinc-800 pb-8"/g,
      'className="border-b border-zinc-200 dark:border-zinc-800 pb-8 transition-colors"'
    );
    
    // Fix text colors in specific contexts
    content = content.replace(
      /text-zinc-400/g,
      'text-zinc-600 dark:text-zinc-400'
    );
    
    content = content.replace(
      /text-emerald-400/g,
      'text-emerald-600 dark:text-emerald-400'
    );
    
    // Update submit buttons
    content = content.replace(
      /className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"/g,
      'className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"'
    );
    
    writeFileSync(pagePath, content);
    console.log(`Updated ${page} with dark mode support!`);
  } catch (err) {
    console.log(`Skipping ${page} - file not found or error:`, err.message);
  }
});

console.log("Showcase pages updated with dark mode support!");