import type { LintResult } from "./spec-linter";

/**
 * Simplified formatting function to avoid cognitive complexity issues
 */
export function formatLintResults(results: LintResult[], colorize = true): string {
  if (!results || results.length === 0) {
    return getSuccessMessage(colorize);
  }

  const severityGroups = groupBySeverity(results);
  const lines = buildOutputLines(severityGroups, colorize);

  return finalizeOutput(lines, results.length);
}

function getSuccessMessage(colorize: boolean): string {
  const message = "✓ No issues found";
  return colorize ? `\u001B[32m${message}\u001B[0m` : message;
}

function groupBySeverity(results: LintResult[]): Map<string, LintResult[]> {
  const groups = new Map<string, LintResult[]>();

  for (const result of results) {
    const severity = result.severity;
    const group = groups.get(severity) || [];
    group.push(result);
    groups.set(severity, group);
  }

  return groups;
}

function buildOutputLines(groups: Map<string, LintResult[]>, colorize: boolean): string[] {
  const lines: string[] = [];
  const severities = ["error", "warning", "info"];

  for (const severity of severities) {
    const items = groups.get(severity);
    if (items && items.length > 0) {
      addSeveritySection(lines, severity, items, colorize);
    }
  }

  return lines;
}

function addSeveritySection(
  lines: string[],
  severity: string,
  items: LintResult[],
  colorize: boolean
): void {
  lines.push("", formatSeverityHeader(severity, items.length, colorize));

  for (const item of items) {
    lines.push(formatResultLine(item, severity, colorize));

    if (item.suggestion) {
      lines.push(`    💡 ${item.suggestion}`);
    }
  }
}

function formatSeverityHeader(severity: string, count: number, colorize: boolean): string {
  const header = `${severity.toUpperCase()}S (${count})`;

  if (!colorize) return header;

  const colors = {
    error: "\u001B[31m",
    warning: "\u001B[33m",
    info: "\u001B[36m",
  };

  const color = colors[severity as keyof typeof colors] || "";
  return `${color}${header}\u001B[0m`;
}

function formatResultLine(item: LintResult, severity: string, colorize: boolean): string {
  const symbols = {
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  const symbol = symbols[severity as keyof typeof symbols] || "•";
  const path = item.path ? ` at ${item.path.join(".")}` : "";
  const base = `  ${symbol} [${item.rule}]${path}: ${item.message}`;

  if (!colorize) return base;

  const colors = {
    error: "\u001B[31m",
    warning: "\u001B[33m",
    info: "\u001B[36m",
  };

  const color = colors[severity as keyof typeof colors] || "";
  return `  ${color}${symbol}\u001B[0m [${item.rule}]${path}: ${item.message}`;
}

function finalizeOutput(lines: string[], issueCount: number): string {
  const issueText = `Found ${issueCount} issue${issueCount === 1 ? "" : "s"}`;
  lines.push("", issueText);

  return lines.join("\n");
}
