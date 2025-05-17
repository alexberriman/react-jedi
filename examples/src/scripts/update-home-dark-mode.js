import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homePath = join(__dirname, "../pages/home/home-page.tsx");
let content = readFileSync(homePath, "utf8");

// Update hero section
content = content.replace(
  /<section className="bg-gradient-to-b from-black to-transparent pt-20 pb-32">/g,
  '<section className="bg-gradient-to-b from-white to-transparent dark:from-black dark:to-transparent pt-20 pb-32 transition-colors duration-300">'
);

// Update text colors
content = content.replace(
  /className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10"/g,
  'className="text-lg sm:text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 mb-10 transition-colors"'
);

// Update buttons
content = content.replace(
  /className="px-6 sm:px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md font-medium text-white transition-colors text-center"/g,
  'className="px-6 sm:px-8 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-md font-medium text-white transition-all shadow-lg hover:shadow-xl text-center"'
);

content = content.replace(
  /className="px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white transition-colors text-center"/g,
  'className="px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 rounded-md font-medium text-white transition-all shadow-lg hover:shadow-xl text-center"'
);

content = content.replace(
  /className="px-6 sm:px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-md font-medium text-white transition-colors text-center"/g,
  'className="px-6 sm:px-8 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md font-medium text-zinc-900 dark:text-white transition-all shadow-lg hover:shadow-xl text-center"'
);

// Update headings
content = content.replace(
  /<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Core Features<\/h2>/g,
  '<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-zinc-900 dark:text-white transition-colors">Core Features</h2>'
);

// Update icon colors
content = content.replace(
  /className="w-6 h-6 text-emerald-400"/g,
  'className="w-6 h-6 text-emerald-600 dark:text-emerald-400 transition-colors"'
);

// Update card backgrounds and text
content = content.replace(
  /className="bg-zinc-800 p-6 rounded-lg hover:bg-zinc-700 transition-colors h-full"/g,
  'className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-lg hover:shadow-xl h-full"'
);

content = content.replace(
  /<h3 className="text-xl font-semibold mb-3 text-emerald-400">/g,
  '<h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">'
);

content = content.replace(
  /<p className="text-zinc-300">/g,
  '<p className="text-zinc-700 dark:text-zinc-300 transition-colors">'
);

// Update tech grid icons
content = content.replace(
  /className="w-16 h-16 text-emerald-400 mx-auto mb-3"/g,
  'className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-3 transition-colors"'
);

// Update CTA section
content = content.replace(
  /<section className="container mx-auto px-4 py-20">/g,
  '<section className="container mx-auto px-4 py-20">'
);

content = content.replace(
  /<h2 className="text-3xl font-bold mb-12 text-center">Ready to Get Started\?<\/h2>/g,
  '<h2 className="text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-white transition-colors">Ready to Get Started?</h2>'
);

writeFileSync(homePath, content);
console.log("Home page updated with dark mode support!");