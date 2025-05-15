import { describe, it, expect } from "vitest";
import { createJedi } from "./index";

describe("createJedi", () => {
  it("should return an object with version", () => {
    const jedi = createJedi();
    expect(jedi.version).toBe("1.0.0");
  });
});
