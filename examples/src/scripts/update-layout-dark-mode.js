import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const layoutPath = join(__dirname, "../components/layout/layout.tsx");
let content = readFileSync(layoutPath, "utf8");

// Update all NavigationMenuTrigger instances
content = content.replace(
  /className="bg-transparent text-zinc-200 hover:text-emerald-400 hover:bg-zinc-800\/50"/g,
  'className="bg-transparent text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"'
);

// Update all ul backgrounds
content = content.replace(
  /className="grid w-\[400px\] gap-3 p-4 bg-zinc-800\/95 backdrop-blur-sm border border-zinc-700 text-white"/g,
  'className="grid w-[400px] gap-3 p-4 bg-white dark:bg-zinc-800/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white transition-colors"'
);

// Update all link styles
content = content.replace(
  /className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-700\/50 hover:text-emerald-400 focus:bg-zinc-700\/50 focus:text-emerald-400"/g,
  'className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700/50 hover:text-emerald-600 dark:hover:text-emerald-400 focus:bg-zinc-100 dark:focus:bg-zinc-700/50 focus:text-emerald-600 dark:focus:text-emerald-400"'
);

// Update all text descriptions
content = content.replace(
  /className="line-clamp-2 text-sm leading-snug text-zinc-300"/g,
  'className="line-clamp-2 text-sm leading-snug text-zinc-600 dark:text-zinc-300"'
);

// Update navigationMenuTriggerStyle instances
content = content.replace(
  /navigationMenuTriggerStyle\(\),\s*"bg-transparent text-zinc-200 hover:text-emerald-400 hover:bg-zinc-800\/50"/g,
  'navigationMenuTriggerStyle(),\n                        "bg-transparent text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"'
);

// Update GitHub link
content = content.replace(
  /className="text-zinc-200 hover:text-emerald-400 transition-colors hidden md:flex items-center gap-1"/g,
  'className="text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:flex items-center gap-1"'
);

// Update footer
content = content.replace(
  /<footer className="bg-black\/30 border-t border-zinc-800 py-8">\s*<div className="container mx-auto px-4 text-center text-zinc-400">/g,
  '<footer className="bg-zinc-100/50 dark:bg-black/30 border-t border-zinc-200 dark:border-zinc-800 py-8 transition-colors duration-300">\n        <div className="container mx-auto px-4 text-center text-zinc-600 dark:text-zinc-400">'
);

// Add DarkModeToggle after GitHub link
content = content.replace(
  /<\/svg>\s*GitHub\s*<\/a>\s*<\/div>/,
  `</svg>
              GitHub
            </a>
            
            <DarkModeToggle />
          </div>`
);

writeFileSync(layoutPath, content);
console.log("Layout updated with dark mode support!");