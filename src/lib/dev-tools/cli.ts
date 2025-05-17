#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createLinter } from "./spec-linter";
import { createFormatter } from "./spec-formatter";
import type { SpecificationSchema } from "../../types/schema/specification";

/**
 * Command-line interface for React Jedi developer tools
 */

interface CLIOptions {
  command: "lint" | "format" | "check";
  files: string[];
  fix?: boolean;
  output?: string;
  quiet?: boolean;
}

function parseArgs(args: string[]): CLIOptions {
  const options: CLIOptions = {
    command: "lint",
    files: [],
    fix: false,
    quiet: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    switch (arg) {
      case "lint":
      case "format":
      case "check": {
        options.command = arg;
        break;
      }
      case "--fix":
      case "-f": {
        options.fix = true;
        break;
      }
      case "--output":
      case "-o": {
        options.output = args[++i];
        break;
      }
      case "--quiet":
      case "-q": {
        options.quiet = true;
        break;
      }
      default: {
        if (!arg.startsWith("-")) {
          options.files.push(arg);
        }
        break;
      }
    }
    i++;
  }

  return options;
}

function readSpecification(filePath: string): SpecificationSchema {
  try {
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    process.exit(1);
  }
}

function writeSpecification(filePath: string, spec: SpecificationSchema): void {
  try {
    const content = JSON.stringify(spec, null, 2);
    writeFileSync(filePath, content, "utf8");
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    process.exit(1);
  }
}

function lintCommand(files: string[], options: CLIOptions): void {
  const linter = createLinter();
  let hasErrors = false;

  for (const file of files) {
    const spec = readSpecification(file);
    const results = linter.lint(spec);

    if (results.length > 0) {
      if (!options.quiet) {
        console.log(`\n${file}:`);
        console.log(linter.formatResults(results, true));
      }

      if (results.some((r) => r.severity === "error")) {
        hasErrors = true;
      }
    } else if (!options.quiet) {
      console.log(`${file}: ✅ No issues found`);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

function formatCommand(files: string[], options: CLIOptions): void {
  const formatter = createFormatter();

  for (const file of files) {
    const spec = readSpecification(file);
    const formatted = formatter.formatInPlace(spec);

    if (options.fix) {
      writeSpecification(file, formatted);
      if (!options.quiet) {
        console.log(`✅ Formatted ${file}`);
      }
    } else {
      if (options.output) {
        writeSpecification(options.output, formatted);
      } else {
        console.log(formatter.format(spec));
      }
    }
  }
}

function checkCommand(files: string[], options: CLIOptions): void {
  const linter = createLinter();
  const formatter = createFormatter();
  let hasIssues = false;

  for (const file of files) {
    const spec = readSpecification(file);
    const lintResults = linter.lint(spec);
    const originalContent = JSON.stringify(spec, null, 2);
    const formattedContent = formatter.format(spec);

    const hasLintErrors = lintResults.some((r) => r.severity === "error");
    const needsFormatting = originalContent !== formattedContent;

    if (hasLintErrors || needsFormatting) {
      hasIssues = true;
      console.log(`\n${file}:`);

      if (hasLintErrors) {
        console.log("Lint errors:");
        console.log(
          linter.formatResults(
            lintResults.filter((r) => r.severity === "error"),
            true
          )
        );
      }

      if (needsFormatting) {
        console.log("Formatting needed");
      }
    } else if (!options.quiet) {
      console.log(`${file}: ✅ All checks passed`);
    }
  }

  if (hasIssues) {
    process.exit(1);
  }
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
React Jedi Developer Tools

Usage:
  rj-dev <command> [options] <files...>

Commands:
  lint     Lint specification files for issues
  format   Format specification files
  check    Check files for lint errors and formatting

Options:
  --fix, -f      Fix issues automatically (format command)
  --output, -o   Output to file instead of stdout
  --quiet, -q    Suppress output except errors

Examples:
  rj-dev lint spec.json
  rj-dev format --fix spec.json
  rj-dev check src/**/*.spec.json
`);
    process.exit(0);
  }

  const options = parseArgs(args);

  if (options.files.length === 0) {
    console.error("Error: No files specified");
    process.exit(1);
  }

  // Resolve file paths
  options.files = options.files.map((file) => path.resolve(process.cwd(), file));

  // Execute command
  switch (options.command) {
    case "lint": {
      lintCommand(options.files, options);
      break;
    }
    case "format": {
      formatCommand(options.files, options);
      break;
    }
    case "check": {
      checkCommand(options.files, options);
      break;
    }
  }
}

// Run CLI if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as cli };
