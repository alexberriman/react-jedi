import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fix brand-presets-page.tsx
const brandPresetsPath = join(__dirname, "../pages/brand-presets/brand-presets-page.tsx");
let content = readFileSync(brandPresetsPath, "utf8");

// Add all needed helper functions at once
const helperFunctions = `// Helper functions for nested ternaries
function getBorderRadius(playfulness: number, minimalism: number): string {
  if (playfulness > 70) return "24px";
  if (minimalism > 70) return "8px";
  return "16px";
}

function getDivBorderRadius(playfulness: number): string {
  return playfulness > 70 ? "12px" : "4px";
}

function getButtonBorderRadius(playfulness: number, minimalism: number): string {
  if (playfulness > 70) return "24px";
  if (minimalism > 70) return "4px";
  return "8px";
}

function getCardBorderRadius(playfulness: number): string {
  return playfulness > 70 ? "16px" : "8px";
}

function getCardTextSize(body: number): string {
  return body < 0.9 ? "14px" : "16px";
}

function getCodeBlockRadius(playfulness: number): string {
  return playfulness > 70 ? "16px" : "8px";
}

`;

// Replace the existing helper functions with all of them
content = content.replace(
  /\/\/ Helper functions for nested ternaries[\s\S]*?function getDivBorderRadius\(playfulness: number\): string \{\s*return playfulness > 70 \? "12px" : "4px";\s*\}/,
  helperFunctions
);

// Fix all borderRadius nested ternaries
content = content.replace(
  /borderRadius: preset\.personality\.playful > 70 \? "24px" : \s*preset\.personality\.minimal > 70 \? "4px" : "8px"/g,
  'borderRadius: getButtonBorderRadius(preset.personality.playful, preset.personality.minimal)'
);

content = content.replace(
  /border-radius: args\.personality\.playful > 70 \? "16px" : "8px"/g,
  'border-radius: getCardBorderRadius(args.personality.playful)'
);

content = content.replace(
  /fontSize: args\.typography\.bodyFontSize \< 0\.9 \? "14px" : "16px"/g,
  'fontSize: getCardTextSize(args.typography.bodyFontSize)'
);

content = content.replace(
  /borderRadius: preset\.personality\.playful > 70 \? "16px" : "8px"/g,
  'borderRadius: getCardBorderRadius(preset.personality.playful)'
);

// Fix the "Here's" apostrophe
content = content.replace(
  /Here's your brand preset's theme configuration:/g,
  "Here's your brand preset's theme configuration:"
);

writeFileSync(brandPresetsPath, content);

// Fix landing-page.tsx
const landingPath = join(__dirname, "../pages/examples/landing/landing-page.tsx");
let landingContent = readFileSync(landingPath, "utf8");

landingContent = landingContent.replace(
  /It's entirely rendered from JSON\./g,
  "It's entirely rendered from JSON."
);

writeFileSync(landingPath, landingContent);

// Fix landing-page.ts schema
const landingSchemaPath = join(__dirname, "../../schemas/landing-page.ts");
try {
  let schemaContent = readFileSync(landingSchemaPath, "utf8");
  
  // Keep the HTML entity for the apostrophe in JSON
  // The linter wants apostrophes escaped in JSX but the schema is just a string
  // No changes needed here since we already used &apos;
  
} catch (err) {
  // Schema file might not exist in scripts directory
}

console.log("ESLint errors fixed!");