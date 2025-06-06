export { iconRegistry, registerIconLibrary } from "./icon-registry";
export type { IconProps, IconComponent, IconRegistryEntry } from "./icon-registry";
export { SDUIIcon, isIconReference, transformIconReference } from "./sdui-icon";
export type { SDUIIconProps } from "./sdui-icon";
export { lucideIcons, registerLucideIcons } from "./lucide-icons";

// Auto-register Lucide icons when this module is imported
import "./lucide-icons";