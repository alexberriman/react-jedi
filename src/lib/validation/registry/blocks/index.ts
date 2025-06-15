import { RegistryModule } from "../../types/registry.types";
import { contentBlocksRegistry } from "./content-blocks";

/**
 * All block component registries
 */
export const blockRegistries: RegistryModule[] = [
  contentBlocksRegistry,
];

/**
 * Export individual registries for direct access if needed
 */

export {contentBlocksRegistry} from "./content-blocks";