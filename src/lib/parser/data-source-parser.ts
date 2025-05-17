/**
 * Data source parser for React Jedi
 * 
 * Parses data source specifications into usable query configurations
 */

import { Ok, Err, Result } from "ts-results-2";
import type { DataSourceSpecification } from "../../types/schema/specification";

/**
 * Interface for parsed data source query
 */
export interface ParsedDataSource {
  id: string;
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  config: Record<string, unknown>;
  cache?: {
    ttl?: number;
  };
  polling?: {
    interval?: number;
    pauseWhenHidden?: boolean;
  };
}

/**
 * Parse a single data source specification
 */
export function parseSingleDataSource(spec: DataSourceSpecification): Result<ParsedDataSource, Error> {
  if (!spec.id) {
    return Err(new Error("Data source specification must have an id"));
  }

  if (!spec.type) {
    return Err(new Error("Data source specification must have a type"));
  }

  const validTypes = ["rest", "graphql", "static", "websocket", "function"];
  if (!validTypes.includes(spec.type)) {
    return Err(new Error(`Invalid data source type: ${spec.type}`));
  }

  if (!spec.config) {
    return Err(new Error("Data source specification must have a config"));
  }

  const parsed: ParsedDataSource = {
    id: spec.id,
    type: spec.type as ParsedDataSource["type"],
    config: spec.config,
  };

  // Add optional cache configuration
  if (spec.cache) {
    parsed.cache = {
      ttl: spec.cache.ttl,
    };
  }

  // Add optional polling configuration
  if (spec.polling) {
    parsed.polling = {
      interval: spec.polling.interval,
      pauseWhenHidden: spec.polling.pauseWhenHidden,
    };
  }

  return Ok(parsed);
}

/**
 * Parse data source specifications (single or array)
 */
export function parseDataSource(
  specifications: DataSourceSpecification | DataSourceSpecification[]
): Result<ParsedDataSource | ParsedDataSource[], Error> {
  if (Array.isArray(specifications)) {
    const results: ParsedDataSource[] = [];
    
    for (const spec of specifications) {
      const result = parseSingleDataSource(spec);
      if (result.err) {
        return Err(result.val);
      }
      results.push(result.val);
    }
    
    return Ok(results);
  } else {
    return parseSingleDataSource(specifications);
  }
}