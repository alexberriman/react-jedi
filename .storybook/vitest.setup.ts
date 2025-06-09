import { beforeAll } from "vitest";
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";

const annotations = setProjectAnnotations([previewAnnotations]);

// Configure global act() handling for React to prevent warnings
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
