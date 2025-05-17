import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fix brand-presets-page.tsx
const brandPresetsPath = join(__dirname, "../pages/brand-presets/brand-presets-page.tsx");
let content = readFileSync(brandPresetsPath, "utf8");

// Fix click handlers - change div to button
content = content.replace(
  /<div\s+key={preset.id}\s+className="bg-zinc-[^"]*"\s+onClick={\(\) => setSelectedPreset\(preset\)}\s*>/g,
  `<button
            key={preset.id}
            className="bg-zinc-800 rounded-lg p-6 cursor-pointer transition-all hover:bg-zinc-700 relative w-full text-left"
            onClick={() => setSelectedPreset(preset)}
            type="button"
          >`
);

content = content.replace(
  /<\/div>\s*\)\)}/, 
  `</button>
        ))}`
);

// Fix click handlers on PresetCard
content = content.replace(
  /onClick={\(\) => onSelect\(preset\)}/g,
  `onClick={() => onSelect(preset)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(preset)}
      role="button"
      tabIndex={0}`
);

// Fix nested ternary operations
// Create helper functions
const helperFunctions = `
function getBrightnessAdjustment(currentBrightness: number, targetBrightness: "light" | "dark") {
  if (targetBrightness === "light") {
    if (currentBrightness < 0.1) return Math.min(currentBrightness * 1.5, 0.15);
    if (currentBrightness < 0.3) return currentBrightness * 1.2;
    return currentBrightness;
  } else {
    if (currentBrightness > 0.9) return currentBrightness * 0.85;
    if (currentBrightness > 0.6) return currentBrightness * 0.9;
    return currentBrightness;
  }
}

function getBorderRadius(playfulness: number, minimalism: number): string {
  if (playfulness > 70) return "24px";
  if (minimalism > 70) return "8px";
  return "16px";
}

function getDivBorderRadius(playfulness: number): string {
  return playfulness > 70 ? "12px" : "4px";
}

function getCardBackground(brightness: number): string {
  if (brightness > 0.8) return "rgba(255, 255, 255, 0.9)";
  if (brightness < 0.2) return "rgba(17, 24, 39, 0.9)";
  return "rgba(31, 41, 55, 0.9)";
}
`;

// Insert helper functions before the generateBrandColors function
content = content.replace(
  'function generateBrandColors(config: BrandConfig): BrandColors {',
  helperFunctions + '\nfunction generateBrandColors(config: BrandConfig): BrandColors {'
);

// Replace nested ternaries with helper function calls
content = content.replace(
  /borderRadius: preset\.personality\.playful > 70 \? "24px" : \s*preset\.personality\.minimal > 70 \? "8px" : "16px"/g,
  'borderRadius: getBorderRadius(preset.personality.playful, preset.personality.minimal)'
);

content = content.replace(
  /borderRadius: preset\.personality\.playful > 70 \? "12px" : "4px"/g,
  'borderRadius: getDivBorderRadius(preset.personality.playful)'
);

content = content.replace(
  /background: brightness > 0\.8 \? "rgba\(255, 255, 255, 0\.9\)" : brightness < 0\.2 \? "rgba\(17, 24, 39, 0\.9\)" : "rgba\(31, 41, 55, 0\.9\)"/g,
  'background: getCardBackground(brightness)'
);

content = content.replace(
  /brightness: shade === "light" \? currentBrightness < 0\.1 \? Math\.min\(currentBrightness \* 1\.5, 0\.15\) : currentBrightness < 0\.3 \? currentBrightness \* 1\.2 : currentBrightness : currentBrightness > 0\.9 \? currentBrightness \* 0\.85 : currentBrightness > 0\.6 \? currentBrightness \* 0\.9 : currentBrightness/g,
  'brightness: getBrightnessAdjustment(currentBrightness, shade)'
);

// Fix apostrophe
content = content.replace(
  /Here's your brand preset's theme configuration:/g,
  'Here\'s your brand preset\'s theme configuration:'
);

writeFileSync(brandPresetsPath, content);

// Fix landing-page.tsx
const landingPath = join(__dirname, "../pages/examples/landing/landing-page.tsx");
let landingContent = readFileSync(landingPath, "utf8");

landingContent = landingContent.replace(
  /Let's build something amazing together/g,
  'Let\'s build something amazing together'
);

writeFileSync(landingPath, landingContent);

console.log("ESLint errors fixed!");