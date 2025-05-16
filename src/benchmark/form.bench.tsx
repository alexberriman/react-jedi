import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form/form";
import { createComponentBenchmark } from "./component-benchmark";

// Mock form component for testing
const MockFormItem = (props: { disabled?: boolean }) => (
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <input disabled={props.disabled} />
    </FormControl>
    <FormDescription>Enter your username.</FormDescription>
    <FormMessage />
  </FormItem>
);

createComponentBenchmark({
  component: MockFormItem,
  name: "FormItem",
  initialProps: {},
  updateProps: { disabled: true },
  timeBudgetMs: 10, // Forms are interactive, allow slightly more time
});

// Test rendering performance of individual form components
describe("Form Components Performance", () => {
  bench("FormItem render", () => {
    const { unmount } = render(
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <input />
        </FormControl>
        <FormDescription>Description</FormDescription>
        <FormMessage>Error message</FormMessage>
      </FormItem>
    );
    cleanup();
    unmount();
  });

  bench("FormLabel render", () => {
    const { unmount } = render(<FormLabel>Test Label</FormLabel>);
    cleanup();
    unmount();
  });

  bench("FormControl render", () => {
    const { unmount } = render(
      <FormControl>
        <input placeholder="test" />
      </FormControl>
    );
    cleanup();
    unmount();
  });

  bench("FormDescription render", () => {
    const { unmount } = render(<FormDescription>This is a description</FormDescription>);
    cleanup();
    unmount();
  });

  bench("FormMessage render", () => {
    const { unmount } = render(<FormMessage>Error message</FormMessage>);
    cleanup();
    unmount();
  });
});

// Test form item variations
describe("FormItem Variations Performance", () => {
  bench("FormItem - minimal", () => {
    const { unmount } = render(
      <FormItem>
        <FormControl>
          <input />
        </FormControl>
      </FormItem>
    );
    cleanup();
    unmount();
  });

  bench("FormItem - with label", () => {
    const { unmount } = render(
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <input />
        </FormControl>
      </FormItem>
    );
    cleanup();
    unmount();
  });

  bench("FormItem - with description", () => {
    const { unmount } = render(
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <input type="email" />
        </FormControl>
        <FormDescription>We&apos;ll never share your email.</FormDescription>
      </FormItem>
    );
    cleanup();
    unmount();
  });

  bench("FormItem - complete", () => {
    const { unmount } = render(
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <input type="password" />
        </FormControl>
        <FormDescription>Must be at least 8 characters.</FormDescription>
        <FormMessage>Password is required</FormMessage>
      </FormItem>
    );
    cleanup();
    unmount();
  });
});

// Test multiple form items
describe("Multiple FormItems Performance", () => {
  bench("Render 2 form items", () => {
    const { unmount } = render(
      <div>
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <input />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <input />
          </FormControl>
        </FormItem>
      </div>
    );
    cleanup();
    unmount();
  });

  bench("Render 5 form items", () => {
    const { unmount } = render(
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <FormItem key={i}>
            <FormLabel>Field {i}</FormLabel>
            <FormControl>
              <input />
            </FormControl>
          </FormItem>
        ))}
      </div>
    );
    cleanup();
    unmount();
  });
});
