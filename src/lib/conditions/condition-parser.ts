/**
 * Condition Parser
 *
 * Parses and evaluates simple boolean expressions for conditional rendering.
 * Supports basic operators and property access.
 */

export type ConditionExpression = string | boolean;

export interface ConditionContext {
  state?: Record<string, unknown>;
  props?: Record<string, unknown>;
  env?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

/**
 * List of operators to tokenize
 */
const OPERATORS = ["===", "!==", ">=", "<=", "&&", "||", "!", ">", "<", "(", ")"];

/**
 * Handles string literal tokenization
 */
function handleStringLiteral(
  char: string,
  inString: boolean,
  stringChar: string
): {
  inString: boolean;
  stringChar: string;
  addChar: boolean;
} {
  if ((char === '"' || char === "'") && !inString) {
    return { inString: true, stringChar: char, addChar: true };
  } else if (char === stringChar && inString) {
    return { inString: false, stringChar: "", addChar: true };
  } else if (inString) {
    return { inString, stringChar, addChar: true };
  }
  return { inString, stringChar, addChar: false };
}

/**
 * Handles operator tokenization
 */
function handleOperator(
  expression: string,
  position: number,
  current: string,
  tokens: string[]
): {
  matched: boolean;
  newPosition: number;
  newCurrent: string;
} {
  for (const op of OPERATORS) {
    if (expression.slice(position, position + op.length) === op) {
      if (current) {
        tokens.push(current);
      }
      tokens.push(op);
      return { matched: true, newPosition: position + op.length - 1, newCurrent: "" };
    }
  }
  return { matched: false, newPosition: position, newCurrent: current };
}

/**
 * Tokenizes a condition expression string
 */
function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inString = false;
  let stringChar = "";

  let i = 0;
  while (i < expression.length) {
    const char = expression[i];

    // Handle string literals
    const stringResult = handleStringLiteral(char, inString, stringChar);
    inString = stringResult.inString;
    stringChar = stringResult.stringChar;

    if (stringResult.addChar) {
      current += char;
      i++;
      continue;
    }

    // Handle whitespace
    if (char === " " || char === "\t" || char === "\n") {
      if (current) {
        tokens.push(current);
        current = "";
      }
      i++;
      continue;
    }

    // Handle operators
    const operatorResult = handleOperator(expression, i, current, tokens);
    if (operatorResult.matched) {
      i = operatorResult.newPosition + 1;
      current = operatorResult.newCurrent;
      continue;
    }

    current += char;
    i++;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * Gets a value from a path like "state.user.name"
 */
function getValue(path: string, context: ConditionContext): unknown {
  const parts = path.split(".");
  const source = parts[0];
  const remainingPath = parts.slice(1);

  let value: unknown;

  switch (source) {
    case "state": {
      value = context.state;
      break;
    }
    case "props": {
      value = context.props;
      break;
    }
    case "env": {
      value = context.env;
      break;
    }
    case "data": {
      value = context.data;
      break;
    }
    default: {
      return undefined;
    }
  }

  // Navigate the path
  for (const part of remainingPath) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return value;
}

/**
 * Converts a token to its actual value
 */
function parseValue(token: string, context: ConditionContext): unknown {
  // String literal
  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    return token.slice(1, -1);
  }

  // Number
  if (/^-?\d+(\.\d+)?$/.test(token)) {
    return Number.parseFloat(token);
  }

  // Boolean
  if (token === "true") return true;
  if (token === "false") return false;
  if (token === "null") return null;
  if (token === "undefined") return undefined;

  // Property access
  return getValue(token, context);
}

/**
 * Evaluates a comparison operation
 */
function evaluateComparison(left: unknown, operator: string, right: unknown): boolean {
  switch (operator) {
    case "===": {
      return left === right;
    }
    case "!==": {
      return left !== right;
    }
    case ">": {
      return (left as number) > (right as number);
    }
    case "<": {
      return (left as number) < (right as number);
    }
    case ">=": {
      return (left as number) >= (right as number);
    }
    case "<=": {
      return (left as number) <= (right as number);
    }
    default: {
      throw new Error(`Unknown operator: ${operator}`);
    }
  }
}

/**
 * Finds matching closing parenthesis
 */
function findClosingParen(tokens: string[], startIndex: number): number {
  let depth = 1;
  for (let i = startIndex + 1; i < tokens.length; i++) {
    if (tokens[i] === "(") depth++;
    if (tokens[i] === ")") depth--;
    if (depth === 0) return i;
  }
  return -1;
}

/**
 * Evaluates a parenthesized expression
 */
function evaluateParentheses(tokens: string[], context: ConditionContext): boolean {
  const firstParen = tokens.indexOf("(");
  if (firstParen === -1) return false;

  const closeParen = findClosingParen(tokens, firstParen);
  if (closeParen === -1) return false;

  const innerResult = evaluateTokens(tokens.slice(firstParen + 1, closeParen), context);

  const newTokens = [
    ...tokens.slice(0, firstParen),
    String(innerResult),
    ...tokens.slice(closeParen + 1),
  ];

  return evaluateTokens(newTokens, context);
}

/**
 * Evaluates a logical operation
 */
function evaluateLogicalOp(
  tokens: string[],
  operator: string,
  context: ConditionContext,
  shortCircuitValue: boolean
): boolean {
  const opIndex = tokens.indexOf(operator);
  if (opIndex === -1) return false;

  const left = evaluateTokens(tokens.slice(0, opIndex), context);

  // Short-circuit evaluation
  if (left === shortCircuitValue) return shortCircuitValue;

  const right = evaluateTokens(tokens.slice(opIndex + 1), context);
  return operator === "&&" ? left && right : left || right;
}

/**
 * Evaluates comparison operations
 */
function evaluateComparisonOps(tokens: string[], context: ConditionContext): boolean | null {
  const comparisonOps = ["===", "!==", ">=", "<=", ">", "<"];

  for (const op of comparisonOps) {
    const opIndex = tokens.indexOf(op);
    if (opIndex !== -1 && opIndex > 0 && opIndex < tokens.length - 1) {
      const left = parseValue(tokens[opIndex - 1], context);
      const right = parseValue(tokens[opIndex + 1], context);
      return evaluateComparison(left, op, right);
    }
  }

  return null;
}

/**
 * Evaluates a tokenized expression
 */
function evaluateTokens(tokens: string[], context: ConditionContext): boolean {
  if (tokens.length === 0) return false;

  // Handle single token
  if (tokens.length === 1) {
    const value = parseValue(tokens[0], context);
    return Boolean(value);
  }

  // Handle negation
  if (tokens[0] === "!") {
    return !evaluateTokens(tokens.slice(1), context);
  }

  // Handle parentheses
  if (tokens.includes("(")) {
    return evaluateParentheses(tokens, context);
  }

  // Handle AND operation
  if (tokens.includes("&&")) {
    return evaluateLogicalOp(tokens, "&&", context, false);
  }

  // Handle OR operation
  if (tokens.includes("||")) {
    return evaluateLogicalOp(tokens, "||", context, true);
  }

  // Handle comparison operations
  const comparisonResult = evaluateComparisonOps(tokens, context);
  if (comparisonResult !== null) {
    return comparisonResult;
  }

  // Default: treat as boolean check
  const value = parseValue(tokens[0], context);
  return Boolean(value);
}

/**
 * Evaluates a condition expression
 */
export function evaluateCondition(
  condition: ConditionExpression,
  context: ConditionContext
): boolean {
  // Handle boolean literals
  if (typeof condition === "boolean") {
    return condition;
  }

  // Handle empty string
  if (!condition || !condition.trim()) {
    return true;
  }

  try {
    const tokens = tokenize(condition);
    return evaluateTokens(tokens, context);
  } catch (error) {
    console.error("Error evaluating condition:", error);
    return false;
  }
}

/**
 * Checks if parentheses are balanced
 */
function checkBalancedParens(tokens: string[]): string | null {
  let parenDepth = 0;
  for (const token of tokens) {
    if (token === "(") parenDepth++;
    if (token === ")") parenDepth--;
    if (parenDepth < 0) {
      return "Unbalanced parentheses";
    }
  }

  return parenDepth === 0 ? null : "Unbalanced parentheses";
}

/**
 * Validates operator placement
 */
function validateOperators(tokens: string[]): string | null {
  const binaryOps = new Set(["===", "!==", ">=", "<=", ">", "<", "&&", "||"]);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (binaryOps.has(token) && (i === 0 || i === tokens.length - 1)) {
      return `Binary operator "${token}" requires operands on both sides`;
    }

    if (token === "!" && i === tokens.length - 1) {
      return 'Negation operator "!" requires an operand';
    }
  }

  return null;
}

/**
 * Validates a condition expression for syntax errors
 */
export function validateConditionExpression(expression: string): {
  valid: boolean;
  error?: string;
} {
  try {
    const tokens = tokenize(expression);

    // Check for balanced parentheses
    const parenError = checkBalancedParens(tokens);
    if (parenError) {
      return { valid: false, error: parenError };
    }

    // Check for valid operators and operands
    const operatorError = validateOperators(tokens);
    if (operatorError) {
      return { valid: false, error: operatorError };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: String(error) };
  }
}
