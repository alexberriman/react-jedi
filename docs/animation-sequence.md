# Animation Sequence System

The animation sequence system provides a powerful way to create complex, chained animations with precise timing control. It allows you to orchestrate multiple animation steps, manage playback controls, and create sophisticated visual effects.

## Features

- **Step-by-Step Animation**: Chain multiple animation steps in sequence
- **Playback Controls**: Play, pause, resume, reset, and reverse animations
- **Looping Support**: Enable continuous playback with optional yoyo effect
- **Event Callbacks**: Hook into animation lifecycle events
- **Parallel Animations**: Orchestrate multiple elements simultaneously
- **Dynamic Sequencing**: Create conditional animations with branching logic

## Basic Usage

### Simple Sequence

```tsx
import { AnimationSequence, createAnimationSequence } from '@banja/react-jedi';

function MyComponent() {
  const config = createAnimationSequence([
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 },
    { scale: 1.05 },
    { scale: 1 },
  ], {
    duration: [0, 0.6, 0.3, 0.3],
    ease: ["linear", "easeOut", "easeInOut", "easeInOut"],
  });

  return (
    <AnimationSequence config={config}>
      <div>Animated Content</div>
    </AnimationSequence>
  );
}
```

### Controlled Sequence

```tsx
import { useRef } from 'react';
import { AnimationSequence, AnimationSequenceControls } from '@banja/react-jedi';

function ControlledAnimation() {
  const controlRef = useRef<AnimationSequenceControls>(null);
  
  const config = {
    steps: [
      { animate: { x: -100, opacity: 0 } },
      { animate: { x: 0, opacity: 1 } },
      { animate: { x: 100, opacity: 1 } },
      { animate: { x: 0, opacity: 1 } },
    ],
    autoPlay: false,
  };

  return (
    <>
      <button onClick={() => controlRef.current?.play()}>Play</button>
      <button onClick={() => controlRef.current?.pause()}>Pause</button>
      <button onClick={() => controlRef.current?.reset()}>Reset</button>
      
      <AnimationSequence config={config} controlRef={controlRef}>
        <div>Controlled Animation</div>
      </AnimationSequence>
    </>
  );
}
```

### Looping Animation

```tsx
const loopingConfig = {
  steps: [
    { animate: { rotate: 0, scale: 1 } },
    { animate: { rotate: 90, scale: 1.2 } },
    { animate: { rotate: 180, scale: 1 } },
    { animate: { rotate: 270, scale: 0.8 } },
    { animate: { rotate: 360, scale: 1 } },
  ],
  loop: true,
  yoyo: true,
  loopDelay: 0.5,
};

<AnimationSequence config={loopingConfig}>
  <div>Looping Animation</div>
</AnimationSequence>
```

## Advanced Features

### Event Callbacks

```tsx
const config = createAnimationSequence([
  { opacity: 0 },
  { opacity: 1 },
], {
  callbacks: [
    {
      onStart: () => console.log('Step 1 started'),
      onComplete: () => console.log('Step 1 completed'),
    },
    {
      onStart: () => console.log('Step 2 started'),
      onComplete: () => console.log('Step 2 completed'),
    },
  ],
});

const sequenceConfig = {
  ...config,
  onSequenceStart: () => console.log('Sequence started'),
  onSequenceComplete: () => console.log('Sequence completed'),
};
```

### Complex Parallel Sequences

```tsx
import { createComplexSequence } from '@banja/react-jedi';

const parallelSteps = createComplexSequence([
  {
    target: "element1",
    steps: [
      { animate: { x: 0, opacity: 0 }, duration: 0 },
      { animate: { x: 0, opacity: 1 }, duration: 0.5 },
      { animate: { x: 100, scale: 1.2 }, duration: 0.5 },
    ],
  },
  {
    target: "element2",
    steps: [
      { animate: { y: 0, opacity: 0 }, duration: 0 },
      { animate: { y: 0, opacity: 1 }, duration: 0.5, delay: 0.2 },
      { animate: { y: -50, rotate: 180 }, duration: 0.5 },
    ],
  },
], {
  stagger: 0.2,
  syncPoints: [1], // Synchronize at step index 1
});

<AnimationSequence config={{ steps: parallelSteps }}>
  <div>
    <div data-sequence="element1">Element 1</div>
    <div data-sequence="element2">Element 2</div>
  </div>
</AnimationSequence>
```

### Using the Hook

```tsx
import { useAnimationSequence } from '@banja/react-jedi';

function HookExample() {
  const { config, status, controlRef } = useAnimationSequence({
    steps: [
      { animate: { scale: 1 }, duration: 0 },
      { animate: { scale: 1.2 }, duration: 0.5 },
      { animate: { scale: 1 }, duration: 0.5 },
    ],
    loop: true,
  });

  return (
    <div>
      <p>Status: {status}</p>
      <AnimationSequence config={config} controlRef={controlRef}>
        <div>Animated Element</div>
      </AnimationSequence>
    </div>
  );
}
```

## API Reference

### AnimationSequence Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `AnimationSequenceConfig` | Configuration object for the animation sequence |
| `controlRef` | `RefObject<AnimationSequenceControls>` | Reference to control methods |
| `className` | `string` | CSS class name |
| `style` | `CSSProperties` | Inline styles |

### AnimationSequenceConfig

| Property | Type | Description |
|----------|------|-------------|
| `steps` | `AnimationStep[]` | Array of animation steps |
| `loop` | `boolean` | Enable looping |
| `repeat` | `number` | Number of repetitions |
| `loopDelay` | `number` | Delay between loops (seconds) |
| `yoyo` | `boolean` | Reverse animation on alternate iterations |
| `autoPlay` | `boolean` | Start animation automatically |
| `onSequenceStart` | `() => void` | Callback when sequence starts |
| `onSequenceComplete` | `() => void` | Callback when sequence completes |

### AnimationStep

| Property | Type | Description |
|----------|------|-------------|
| `animate` | `TargetAndTransition` | Animation properties |
| `duration` | `number` | Duration in seconds |
| `delay` | `number` | Delay before step starts |
| `ease` | `string` | Easing function |
| `onStart` | `() => void` | Callback when step starts |
| `onComplete` | `() => void` | Callback when step completes |

### Control Methods

| Method | Description |
|--------|-------------|
| `play()` | Start the animation sequence |
| `pause()` | Pause the animation |
| `resume()` | Resume from paused state |
| `reset()` | Reset to initial state |
| `reverse()` | Reverse the animation direction |
| `goToStep(index)` | Jump to specific step |
| `getCurrentStep()` | Get current step index |
| `getTotalSteps()` | Get total number of steps |

## Best Practices

1. **Keep sequences focused**: Each sequence should have a clear purpose
2. **Use appropriate durations**: Balance visual appeal with performance
3. **Leverage callbacks**: Use lifecycle callbacks for side effects
4. **Consider performance**: Be mindful of the number of animated properties
5. **Test thoroughly**: Verify animations work across different devices
6. **Provide controls**: Give users control over complex animations
7. **Use semantic naming**: Name your animation steps and sequences clearly

## Examples

- [Basic Sequence](/examples/animation-sequence#basic)
- [Controlled Playback](/examples/animation-sequence#controlled)
- [Looping Animations](/examples/animation-sequence#looping)
- [Parallel Sequences](/examples/animation-sequence#parallel)
- [Interactive Playground](/examples/animation-sequence#playground)