#!/usr/bin/env ts-node

import { exec } from "child_process";
import { mkdir, rm, writeFile } from "fs/promises";
import { glob } from "glob";
import { promisify } from "util";
import chalk from "chalk";
import path from "path";

const execAsync = promisify(exec);

// Parse CLI arguments
const args = process.argv.slice(2);

// Check for help flag
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: npm run test:debug [options]

Options:
  -c, --concurrency <number>  Number of tests to run in parallel (default: 5)
  -h, --help                  Show this help message

Examples:
  npm run test:debug                  # Run with default concurrency (5)
  npm run test:debug -c 10            # Run with 10 parallel tests
  npm run test:debug --concurrency 1  # Run tests serially
`);
  process.exit(0);
}

const concurrencyIndex = args.findIndex((arg) => arg === "--concurrency" || arg === "-c");
const concurrency =
  concurrencyIndex !== -1 && args[concurrencyIndex + 1]
    ? Math.max(1, parseInt(args[concurrencyIndex + 1], 10) || 5)
    : 3;

interface TestResult {
  testFile: string;
  passed: boolean;
  duration: number;
  stdout: string;
  stderr: string;
  error?: Error;
  startTime?: Date;
  endTime?: Date;
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${((ms % 60000) / 1000).toFixed(1)}s`;
}

function cleanStderr(stderr: string): string {
  return stderr
    .split("\n")
    .filter(
      (line) =>
        !line.includes("ExperimentalWarning: Type Stripping is an experimental feature") &&
        !line.includes("Use `node --trace-warnings ...` to show where the warning was created") &&
        !line.includes("You have Reduced Motion enabled on your device") &&
        !line.includes("Animations may not appear as expected") &&
        !line.match(/^stderr \| .* > Reduced Motion$/)
    )
    .join("\n")
    .trim();
}

async function cleanupTestDirectory(dir: string): Promise<void> {
  try {
    await rm(dir, { recursive: true, force: true });
  } catch {
    // Directory might not exist, that's fine
  }
  await mkdir(dir, { recursive: true });
}

async function runTest(testFile: string, index?: number, total?: number): Promise<TestResult> {
  const startTime = Date.now();
  const startDate = new Date();
  const testName = path.relative(process.cwd(), testFile);
  const prefix = index !== undefined && total !== undefined ? `[${index + 1}/${total}]` : "";

  // Log test start
  console.log(chalk.gray(`${getTimestamp()} ${prefix} 🏃 Starting: ${testName}`));

  const command = `VITEST_STORYBOOK=true npx vitest run "${testFile}"`;

  try {
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large outputs
      env: { ...process.env, VITEST_STORYBOOK: "true" },
    });

    return {
      testFile,
      passed: true,
      duration: Date.now() - startTime,
      stdout,
      stderr,
      startTime: startDate,
      endTime: new Date(),
    };
  } catch (error: any) {
    return {
      testFile,
      passed: false,
      duration: Date.now() - startTime,
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      error,
      startTime: startDate,
      endTime: new Date(),
    };
  }
}

async function writeLogFile(logDir: string, result: TestResult): Promise<void> {
  const cleanedStderr = cleanStderr(result.stderr);

  // Only write log file if test failed or has meaningful stderr output
  if (!result.passed || cleanedStderr) {
    const testName = path.basename(result.testFile, path.extname(result.testFile));
    const logPath = path.join(logDir, `${testName}.log`);

    const logContent = [
      `Test File: ${result.testFile}`,
      `Status: ${result.passed ? "PASSED" : "FAILED"}`,
      `Duration: ${result.duration}ms`,
      `Command: VITEST_STORYBOOK=true npx vitest run "${result.testFile}"`,
      "",
      "=== STDOUT ===",
      result.stdout || "(empty)",
      "",
      "=== STDERR ===",
      result.stderr || "(empty)",
      "",
      ...(result.error ? ["=== ERROR ===", result.error.message, result.error.stack || ""] : []),
    ].join("\n");

    await writeFile(logPath, logContent, "utf-8");
  }
}

function formatTestResult(result: TestResult, index: number, total: number): string {
  const testName = path.relative(process.cwd(), result.testFile);
  const prefix = `[${index + 1}/${total}]`;

  const cleanedStderr = cleanStderr(result.stderr);
  const duration = formatDuration(result.duration);
  const timestamp = getTimestamp();

  if (result.passed && !cleanedStderr) {
    return chalk.green(`${timestamp} ${prefix} ✅ ${testName} (${duration})`);
  } else if (result.passed && cleanedStderr) {
    return chalk.yellow(`${timestamp} ${prefix} ⚠️  ${testName} (${duration}) - warnings logged`);
  } else {
    return chalk.red(`${timestamp} ${prefix} ❌ ${testName} (${duration}) - see log file`);
  }
}

async function processTestQueue(
  testFiles: string[],
  concurrency: number,
  logDir: string
): Promise<{ passed: number; failed: number; warnings: number }> {
  const totalFiles = testFiles.length;
  const results: TestResult[] = [];
  let queueIndex = 0;

  // Worker function that processes tests from the queue
  async function worker(workerId: number): Promise<TestResult[]> {
    const workerResults: TestResult[] = [];

    while (true) {
      // Get next test from queue (thread-safe)
      const myIndex = queueIndex++;
      if (myIndex >= totalFiles) break;

      const testFile = testFiles[myIndex];
      const result = await runTest(testFile, myIndex, totalFiles);

      // Process result immediately
      console.log(formatTestResult(result, myIndex, totalFiles));
      await writeLogFile(logDir, result);

      workerResults.push(result);

      // Log progress every 10 tests
      const completed = results.length + workerResults.length;
      if (completed % 10 === 0) {
        console.log(
          chalk.cyan(
            `${getTimestamp()} 📈 Progress: ~${completed}/${totalFiles} (~${Math.round((completed / totalFiles) * 100)}%)`
          )
        );
      }
    }

    return workerResults;
  }

  // Start workers
  console.log(chalk.blue(`${getTimestamp()} 🚀 Starting ${concurrency} workers...\n`));
  const workers = Array.from({ length: concurrency }, (_, i) => worker(i));
  const workerResults = await Promise.all(workers);

  // Combine all results
  workerResults.forEach((wr) => results.push(...wr));

  // Count results
  let passed = 0;
  let failed = 0;
  let warnings = 0;

  results.forEach((result) => {
    const cleanedStderr = cleanStderr(result.stderr);
    if (result.passed && !cleanedStderr) {
      passed++;
    } else if (result.passed && cleanedStderr) {
      warnings++;
    } else {
      failed++;
    }
  });

  return { passed, failed, warnings };
}

async function main(): Promise<void> {
  const startTime = Date.now();
  const logDir = path.join(process.cwd(), "tmp", "tests");

  console.log(chalk.blue(`\n🧪 Running storybook test files`));
  console.log(chalk.gray(`   Started at: ${getTimestamp()}`));
  console.log(chalk.gray(`   Concurrency: ${concurrency} parallel tests\n`));

  // Clean up test directory
  console.log(chalk.gray(`${getTimestamp()} 🧹 Cleaning up test directory...`));
  await cleanupTestDirectory(logDir);

  // Find all storybook test files
  console.log(chalk.gray(`${getTimestamp()} 🔍 Searching for test files...`));
  const testFiles = await glob("**/*.stories.{ts,tsx}", {
    ignore: ["node_modules/**", "dist/**", "tmp/**"],
    absolute: true,
  });

  if (testFiles.length === 0) {
    console.log(chalk.yellow(`${getTimestamp()} ⚠️  No storybook test files found!`));
    return;
  }

  console.log(chalk.blue(`${getTimestamp()} 📁 Found ${testFiles.length} storybook test files\n`));

  // Process tests using queue-based approach
  const results = await processTestQueue(testFiles, concurrency, logDir);
  const { passed, failed, warnings } = results;

  // Summary
  const totalDuration = Date.now() - startTime;
  console.log(chalk.blue(`\n${getTimestamp()} 📊 Test Summary:`));
  console.log(chalk.green(`   ✅ Passed: ${passed}`));
  if (warnings > 0) {
    console.log(chalk.yellow(`   ⚠️  Warnings: ${warnings}`));
  }
  if (failed > 0) {
    console.log(chalk.red(`   ❌ Failed: ${failed}`));
  }

  console.log(chalk.gray(`\n   Total duration: ${formatDuration(totalDuration)}`));
  console.log(chalk.gray(`   Completed at: ${getTimestamp()}`));
  console.log(chalk.gray(`   Log files: ${logDir}/\n`));

  // Exit with error code if any tests failed
  if (failed > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error(chalk.red("Fatal error:"), error);
  process.exit(1);
});
