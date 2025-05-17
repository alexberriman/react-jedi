# Accessibility Module

The React Jedi accessibility module provides comprehensive tools for building accessible React applications that meet WCAG 2.1 standards.

## Features

### Focus Management
A complete focus management system with:
- **Focus Trap**: Keep focus within modals, dialogs, and other containers
- **Focus Return**: Return focus to the previously focused element
- **Focus Monitoring**: Track focus state on any element
- **Auto Focus**: Automatically focus elements on mount
- **Focus Lists**: Handle keyboard navigation in lists and menus
- **Skip Links**: Provide jump-to-content functionality
- **Last Focused**: Track and restore the last focused element

### ARIA Attributes
Utilities for managing ARIA attributes programmatically (from aria-attributes.ts):
- Label and description management
- Live region announcements
- State and property helpers
- Keyboard navigation support

## Usage

### Focus Trap
```tsx
import { useFocusTrap } from '@banja/react-jedi/accessibility';

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

### List Navigation
```tsx
import { useFocusList } from '@banja/react-jedi/accessibility';

function NavigationMenu({ items }) {
  const menuRef = useRef(null);
  const { focusedIndex, focusItem } = useFocusList(menuRef, {
    orientation: 'vertical',
    wrap: true,
  });

  return (
    <nav ref={menuRef} role="navigation">
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

### Skip Links
```tsx
import { useSkipLink } from '@banja/react-jedi/accessibility';

function App() {
  const { skipToContent } = useSkipLink('main-content');

  return (
    <>
      <button onClick={skipToContent} className="skip-link">
        Skip to main content
      </button>
      <header>{/* Header content */}</header>
      <main id="main-content">{/* Main content */}</main>
    </>
  );
}
```

### Auto Focus
```tsx
import { useFocusOnMount } from '@banja/react-jedi/accessibility';

function SearchForm() {
  const inputRef = useRef(null);
  
  useFocusOnMount(inputRef, {
    delay: 100,
    preventScroll: false,
  });

  return (
    <input 
      ref={inputRef}
      type="search" 
      placeholder="Type to search..."
    />
  );
}
```

## Hooks API

### `useFocusTrap`
- `enabled`: Boolean to enable/disable the trap
- `returnFocus`: Return focus to previous element on deactivation
- `initialFocus`: Element to focus when trap activates
- `escapeDeactivates`: Allow Escape key to deactivate

### `useFocusReturn`
- `enabled`: Enable/disable focus return
- `delay`: Delay before restoring focus

### `useFocusOnMount`
- `enabled`: Enable/disable auto focus
- `delay`: Delay before focusing
- `preventScroll`: Prevent scrolling to focused element

### `useFocusMonitor`
- `onFocus`: Callback when element receives focus
- `onBlur`: Callback when element loses focus

### `useFocusList`
- `orientation`: 'horizontal' | 'vertical' | 'both'
- `wrap`: Wrap around at list ends
- `onItemFocus`: Callback when item receives focus

### `useSkipLink`
- `offset`: Scroll offset from top
- `smooth`: Use smooth scrolling

### `useLastFocused`
No options - automatically tracks last focused element

## WCAG Compliance

This module helps meet the following WCAG 2.1 success criteria:

- **2.1.1 Keyboard**: All functionality accessible from keyboard
- **2.1.2 No Keyboard Trap**: Keyboard focus can be moved away
- **2.4.1 Bypass Blocks**: Skip links to bypass repeated content
- **2.4.3 Focus Order**: Logical and meaningful focus order
- **2.4.7 Focus Visible**: Focus indicators are always visible

## Best Practices

1. **Always trap focus in modals** to prevent navigation outside
2. **Return focus after interactions** to maintain user context
3. **Provide skip links** for repetitive content
4. **Use semantic HTML** with proper ARIA labels
5. **Test with keyboard only** - no mouse usage
6. **Test with screen readers** (NVDA, JAWS, VoiceOver)
7. **Use ESC key** to close modals and dialogs
8. **Implement arrow key navigation** for lists and menus

## Browser Support

Works in all modern browsers with graceful fallbacks for:
- IE11 (with polyfills)
- Mobile browsers (touch + keyboard)
- Screen readers (JAWS, NVDA, VoiceOver)

## Testing

Use the following tools to test accessibility:
- axe DevTools
- WAVE
- Keyboard navigation
- Screen readers
- Chrome/Firefox accessibility inspector