import * as React from "react";
import { bench, describe } from "vitest";
import { renderToString } from "react-dom/server";
import { createStateManager } from "@/lib/state";
import { createOptimizedStateManager } from "@/lib/performance/state-optimizations";
import { Button } from "@/components/ui/button";

// Test component that reads from state and triggers updates
function TestComponent({ stateKey = "counter" }: { readonly stateKey?: string }) {
  const manager = React.useContext(
    React.createContext(null as ReturnType<typeof createStateManager> | null)
  );
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = manager?.subscribe((state: Record<string, unknown>) => {
      setCount((state[stateKey] as number) || 0);
    });
    return () => unsubscribe?.();
  }, [manager, stateKey]);

  return (
    <div>
      <span>Count: {count}</span>
      <Button onClick={() => manager?.setState({ [stateKey]: count + 1 })}>Increment</Button>
    </div>
  );
}

// Wrapper component that creates many state-connected components
function ComplexApp({ manager }: { readonly manager: ReturnType<typeof createStateManager> }) {
  const ManagerContext = React.createContext(manager);

  return (
    <ManagerContext.Provider value={manager}>
      <div>
        {Array.from({ length: 10 }, (_, i) => (
          <TestComponent key={i} stateKey={`counter${i}`} />
        ))}
      </div>
    </ManagerContext.Provider>
  );
}

describe("State Optimization Benchmarks", () => {
  bench("baseline state manager - single update", () => {
    const manager = createStateManager({
      initialState: { counter: 0 },
    });

    manager.setState({ counter: 1 });
  });

  bench("optimized state manager - single update", () => {
    const manager = createOptimizedStateManager(
      createStateManager({
        initialState: { counter: 0 },
      })
    );

    manager.setState({ counter: 1 });
  });

  bench("baseline state manager - multiple rapid updates", () => {
    const manager = createStateManager({
      initialState: { counter: 0, value: "", flag: false },
    });

    for (let i = 0; i < 100; i++) {
      manager.setState({ counter: i });
      manager.setState({ value: `value${i}` });
      manager.setState({ flag: i % 2 === 0 });
    }
  });

  bench("optimized state manager - multiple rapid updates", () => {
    const manager = createOptimizedStateManager(
      createStateManager({
        initialState: { counter: 0, value: "", flag: false },
      })
    );

    for (let i = 0; i < 100; i++) {
      manager.setState({ counter: i });
      manager.setState({ value: `value${i}` });
      manager.setState({ flag: i % 2 === 0 });
    }
  });

  bench("baseline state manager - complex app render", () => {
    const manager = createStateManager({
      initialState: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`counter${i}`, 0])),
    });

    const element = <ComplexApp manager={manager} />;
    renderToString(element);

    // Simulate updates
    for (let i = 0; i < 10; i++) {
      manager.setState({ [`counter${i}`]: i });
    }
  });

  bench("optimized state manager - complex app render", () => {
    const baseManager = createStateManager({
      initialState: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`counter${i}`, 0])),
    });
    const manager = createOptimizedStateManager(baseManager);

    const element = <ComplexApp manager={manager} />;
    renderToString(element);

    // Simulate updates
    for (let i = 0; i < 10; i++) {
      manager.setState({ [`counter${i}`]: i });
    }
  });

  bench("baseline state manager - large state object", () => {
    const largeState = Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [`key${i}`, i]));

    const manager = createStateManager({
      initialState: largeState,
    });

    // Update multiple keys
    for (let i = 0; i < 100; i++) {
      manager.setState({ [`key${i}`]: i * 2 });
    }
  });

  bench("optimized state manager - large state object", () => {
    const largeState = Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [`key${i}`, i]));

    const manager = createOptimizedStateManager(
      createStateManager({
        initialState: largeState,
      })
    );

    // Update multiple keys
    for (let i = 0; i < 100; i++) {
      manager.setState({ [`key${i}`]: i * 2 });
    }
  });
});
