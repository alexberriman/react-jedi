# Focus Management

Focus management is a critical aspect of web accessibility that ensures keyboard users and assistive technology users can effectively navigate and interact with your application. The React Jedi library provides a comprehensive set of utilities and hooks for managing focus in your React applications.

## Overview

The focus management system provides:

- **Focus Trap**: Contain focus within specific regions (e.g., modals, dialogs)
- **Focus Return**: Restore focus to previous elements after interactions
- **Focus Monitoring**: Track focus state of elements
- **Focus Lists**: Navigate lists with arrow keys
- **Skip Links**: Jump to main content areas
- **Auto-focus**: Focus elements on mount
- **Last Focused**: Track and restore last focused element

## Utility Functions

### `getFocusableElements(container: HTMLElement): HTMLElement[]`

Returns all focusable elements within a container.

```typescript
const container = document.getElementById('my-container');
const focusableElements = getFocusableElements(container);
```

### `focusElement(element: HTMLElement, options?)`

Focuses an element with optional scroll behavior and delay.

```typescript
focusElement(button, { 
  preventScroll: true,
  delay: 200 
});
```

## Hooks

### `useFocusTrap`

Traps focus within a specific container, commonly used for modals and dialogs.

```tsx
import { useFocusTrap } from '@/lib/accessibility/focus-management';

function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  
  const { activate, deactivate, isActive } = useFocusTrap(modalRef, {
    enabled: isOpen,
    returnFocus: true,
    escapeDeactivates: true,
  });

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

#### Options

- `enabled`: Whether the focus trap is active
- `returnFocus`: Return focus to previous element when deactivated
- `initialFocus`: Element to focus when trap activates
- `escapeDeactivates`: Allow Escape key to deactivate trap

### `useFocusReturn`

Saves the current focus and restores it later, useful for temporary UI interactions.

```tsx
function DetailPanel() {
  const { saveFocus, restoreFocus } = useFocusReturn();

  const handleOpen = () => {
    saveFocus();
    // Open panel
  };

  const handleClose = () => {
    // Close panel
    restoreFocus();
  };

  return <div>{/* Panel content */}</div>;
}
```

### `useFocusOnMount`

Automatically focuses an element when it mounts.

```tsx
function SearchForm() {
  const inputRef = useRef(null);
  
  useFocusOnMount(inputRef, {
    enabled: true,
    delay: 100,
    preventScroll: false,
  });

  return <input ref={inputRef} type="search" />;
}
```

### `useFocusMonitor`

Monitors the focus state of an element.

```tsx
function InteractiveButton() {
  const buttonRef = useRef(null);
  const { isFocused } = useFocusMonitor(buttonRef, {
    onFocus: () => console.log('Button focused'),
    onBlur: () => console.log('Button blurred'),
  });

  return (
    <button 
      ref={buttonRef}
      className={isFocused ? 'focused' : ''}
    >
      {isFocused ? 'Focused!' : 'Click me'}
    </button>
  );
}
```

### `useFocusList`

Manages keyboard navigation within a list of items.

```tsx
function NavigationMenu() {
  const listRef = useRef(null);
  const { focusedIndex, focusItem } = useFocusList(listRef, {
    orientation: 'vertical',
    wrap: true,
    onItemFocus: (index, element) => {
      console.log(`Focused item ${index}`);
    },
  });

  return (
    <nav ref={listRef} role="navigation">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.url}
          tabIndex={index === 0 ? 0 : -1}
          className={focusedIndex === index ? 'focused' : ''}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

#### Options

- `orientation`: 'horizontal' | 'vertical' | 'both'
- `wrap`: Whether to wrap around at the ends
- `onItemFocus`: Callback when an item receives focus

### `useSkipLink`

Creates skip links for jumping to main content areas.

```tsx
function Layout() {
  const { skipToContent } = useSkipLink('main-content', {
    offset: 0,
    smooth: true,
  });

  return (
    <>
      <button 
        onClick={skipToContent}
        className="sr-only focus:not-sr-only"
      >
        Skip to main content
      </button>
      
      <nav>{/* Navigation */}</nav>
      
      <main id="main-content">
        {/* Main content */}
      </main>
    </>
  );
}
```

### `useLastFocused`

Tracks the last focused element in the document.

```tsx
function App() {
  const { getLastFocused, focusLastFocused } = useLastFocused();

  const handleAction = () => {
    // Perform some action
    // Then return focus to the last focused element
    focusLastFocused();
  };

  return <div>{/* App content */}</div>;
}
```

## Best Practices

### 1. Modal and Dialog Focus Management

Always trap focus within modals and dialogs:

```tsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  
  useFocusTrap(modalRef, {
    enabled: isOpen,
    returnFocus: true,
    escapeDeactivates: true,
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef} 
        role="dialog" 
        aria-modal="true"
        className="modal-content"
      >
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
```

### 2. Skip Links

Provide skip links for keyboard users to bypass repetitive content:

```tsx
function App() {
  const { skipToContent } = useSkipLink('main-content');

  return (
    <>
      <a 
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToContent();
        }}
        className="skip-link"
      >
        Skip to main content
      </a>
      
      <header>{/* Header content */}</header>
      <nav>{/* Navigation */}</nav>
      <main id="main-content">{/* Main content */}</main>
    </>
  );
}
```

### 3. Keyboard Navigation

Implement proper keyboard navigation for lists and menus:

```tsx
function Menu({ items }) {
  const menuRef = useRef(null);
  const { focusedIndex } = useFocusList(menuRef, {
    orientation: 'vertical',
    wrap: true,
  });

  return (
    <ul ref={menuRef} role="menu">
      {items.map((item, index) => (
        <li key={item.id} role="none">
          <button
            role="menuitem"
            tabIndex={index === 0 ? 0 : -1}
            className={focusedIndex === index ? 'focused' : ''}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### 4. Form Field Focus

Auto-focus important form fields for better UX:

```tsx
function LoginForm() {
  const usernameRef = useRef(null);
  
  useFocusOnMount(usernameRef, {
    delay: 100,
  });

  return (
    <form>
      <input 
        ref={usernameRef}
        type="text" 
        name="username"
        placeholder="Username"
      />
      <input 
        type="password" 
        name="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## WCAG Compliance

The focus management system helps meet various WCAG 2.1 success criteria:

- **2.1.1 Keyboard**: All functionality is available from a keyboard
- **2.1.2 No Keyboard Trap**: Keyboard focus can be moved away from any component
- **2.4.1 Bypass Blocks**: Skip links allow bypassing repetitive content
- **2.4.3 Focus Order**: Focus order is logical and meaningful
- **2.4.7 Focus Visible**: Focus indicators are always visible

## Testing Focus Management

When testing focus management:

1. **Navigate using only the keyboard** (Tab, Shift+Tab, arrow keys)
2. **Verify focus indicators** are visible and clear
3. **Test with screen readers** to ensure announcements are correct
4. **Check focus order** is logical and follows visual flow
5. **Ensure focus traps** work correctly in modals and dialogs
6. **Test skip links** jump to the correct content

## Performance Considerations

- Use `preventScroll` option when focusing elements to avoid layout shifts
- Debounce focus monitoring callbacks if they trigger expensive operations
- Lazy-load focus management hooks only where needed
- Consider using `useFocusOnMount` with a small delay to prevent layout thrashing

## Browser Compatibility

The focus management utilities work in all modern browsers and include fallbacks for:
- IE11 (with polyfills)
- Mobile browsers (touch + keyboard support)
- Screen readers (JAWS, NVDA, VoiceOver)