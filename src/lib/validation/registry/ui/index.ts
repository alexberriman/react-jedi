import { RegistryModule } from "../../types/registry.types";
import { formComponentsRegistry } from "./form-components";
import { layoutComponentsRegistry } from "./layout-components";
import { displayComponentsRegistry } from "./display-components";

/**
 * All UI component registries
 */
export const uiRegistries: RegistryModule[] = [
  formComponentsRegistry,
  layoutComponentsRegistry,
  displayComponentsRegistry,
];

/**
 * Export individual registries for direct access if needed
 */

export {formComponentsRegistry} from "./form-components";
export {layoutComponentsRegistry} from "./layout-components";
export {displayComponentsRegistry} from "./display-components";