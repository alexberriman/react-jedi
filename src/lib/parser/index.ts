/**
 * Parser Module Index
 *
 * This file exports the specification parser and validator utilities.
 */

export {
  SpecificationParser,
  SpecificationParserErrorType,
  type SpecificationParserError,
  type SpecificationParserOptions,
  type SpecificationParserResult,
  parseSpecification,
  createParser,
  defaultParser,
} from "./specification-parser";

export {
  SpecificationValidator,
  type SpecificationValidationOptions,
  type SpecificationValidationResult,
  validateUISpecification,
  validateComponentSpec,
  createValidator,
  defaultValidator,
} from "./specification-validator";

export {
  parseDataSource,
  parseSingleDataSource,
  type ParsedDataSource,
  type DataSourceConfig,
} from "./data-source-parser";

export {
  processTemplate,
  processJsonTemplate,
  hasTemplateVariables,
  extractTemplateVariables,
} from "./template-engine";

export {
  ValidationPipeline,
  createValidationPipeline,
  ValidationStageType,
  type ValidationPipelineOptions,
  type ValidationStageError,
  type ValidationStage,
  type ValidationStageResult,
} from "./validation-pipeline";
