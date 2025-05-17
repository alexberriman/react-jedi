/**
 * Data source parser for React Jedi
 *
 * Parses data source specifications into usable query configurations
 */

import { ok, err, Result, Ok, Err } from "../type-safety";
import type { DataSourceSpecification } from "../../types/schema/specification";

/**
 * Type for data source config union
 */
export type DataSourceConfig = DataSourceSpecification["config"];

/**
 * Interface for parsed data source query
 */
export interface ParsedDataSource {
  id: string;
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  config: DataSourceConfig;
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
export function parseSingleDataSource(
  spec: DataSourceSpecification
): Result<ParsedDataSource, Error> {
  if (!spec.id) {
    return err(new Error("Data source specification must have an id"));
  }

  if (!spec.type) {
    return err(new Error("Data source specification must have a type"));
  }

  const validTypes = ["rest", "graphql", "static", "websocket", "function"];
  if (!validTypes.includes(spec.type)) {
    return err(new Error(`Invalid data source type: ${spec.type}`));
  }

  if (!spec.config) {
    return err(new Error("Data source specification must have a config"));
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

  return ok(parsed);
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
      if (result.isErr) {
        return err((result as Err<Error>).error);
      }
      results.push((result as Ok<ParsedDataSource>).value);
    }

    return ok(results);
  } else {
    return parseSingleDataSource(specifications);
  }
}
