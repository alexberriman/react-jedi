import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to recursively find all React files
function findReactFiles(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const path = join(dir, item);
    const stat = statSync(path);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
      findReactFiles(path, files);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      files.push(path);
    }
  }
  
  return files;
}

// Find all React files
const srcDir = join(__dirname, "..");
const files = findReactFiles(srcDir);

// Common replacements
const replacements = [
  // Backgrounds
  [/bg-zinc-900/g, 'bg-zinc-50 dark:bg-zinc-900'],
  [/bg-black/g, 'bg-white dark:bg-black'],
  [/bg-zinc-800/g, 'bg-zinc-100 dark:bg-zinc-800'],
  [/bg-zinc-700/g, 'bg-zinc-200 dark:bg-zinc-700'],
  
  // Text colors
  [/text-white(?!\/)/g, 'text-zinc-900 dark:text-white'],
  [/text-zinc-200/g, 'text-zinc-800 dark:text-zinc-200'],
  [/text-zinc-300/g, 'text-zinc-700 dark:text-zinc-300'],
  [/text-zinc-400/g, 'text-zinc-600 dark:text-zinc-400'],
  
  // Borders
  [/border-zinc-800/g, 'border-zinc-200 dark:border-zinc-800'],
  [/border-zinc-700/g, 'border-zinc-300 dark:border-zinc-700'],
  
  // Hover states
  [/hover:bg-zinc-700/g, 'hover:bg-zinc-200 dark:hover:bg-zinc-700'],
  [/hover:bg-zinc-800/g, 'hover:bg-zinc-100 dark:hover:bg-zinc-800'],
  
  // Green/Emerald colors
  [/text-emerald-400/g, 'text-emerald-600 dark:text-emerald-400'],
  [/text-emerald-300/g, 'text-emerald-700 dark:text-emerald-300'],
  [/hover:text-emerald-400/g, 'hover:text-emerald-600 dark:hover:text-emerald-400'],
  [/hover:text-emerald-300/g, 'hover:text-emerald-700 dark:hover:text-emerald-300'],
];

// Process files
let updatedCount = 0;
files.forEach(file => {
  try {
    let content = readFileSync(file, "utf8");
    let hasChanges = false;
    
    // Skip if file already has dark mode classes
    if (content.includes('dark:')) {
      console.log(`Skipping ${file} - already has dark mode support`);
      return;
    }
    
    // Apply replacements
    replacements.forEach(([pattern, replacement]) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });
    
    // Add transition classes where missing
    if (hasChanges && !content.includes('transition-colors')) {
      content = content.replace(
        /className="([^"]*(?:bg-|text-|border-)[^"]*)"(?!.*transition)/g,
        'className="$1 transition-colors"'
      );
    }
    
    if (hasChanges) {
      writeFileSync(file, content);
      console.log(`Updated ${file}`);
      updatedCount++;
    }
  } catch (err) {
    console.log(`Error processing ${file}:`, err.message);
  }
});

console.log(`\nCompleted dark mode updates! Updated ${updatedCount} files.`);