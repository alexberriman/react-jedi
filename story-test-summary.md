# Storybook Test Summary

This report summarizes all .stories.tsx files in the React Jedi project that contain test configurations or play functions.

## Overview

- **Total story files with play functions**: 86 files
- **Total story files with test tags**: 45 files
- **Total story files with userEvent interactions**: 50 files

## Files with Play Functions

These story files include `play:` functions for interaction testing:

### Block Components (14 files)
- announcement-bar.stories.tsx
- blog-post-detail.stories.tsx
- blog-post-grid.stories.tsx
- brand-logo-bar.stories.tsx
- call-to-action.stories.tsx
- carousel-block.stories.tsx
- contact-form-block.stories.tsx
- contact-form.stories.tsx
- photo-gallery.stories.tsx
- pricing-table.stories.tsx
- product-showcase.stories.tsx
- sidebar.stories.tsx
- social-share-bar.stories.tsx
- testimonial.stories.tsx

### UI Components (71 files)
- accordion.stories.tsx
- alert.stories.tsx
- alert-dialog.stories.tsx
- aspect-ratio.stories.tsx
- avatar.stories.tsx
- badge.stories.tsx
- blockquote.stories.tsx
- box.stories.tsx
- breadcrumb.stories.tsx
- button.stories.tsx
- calendar.stories.tsx
- card.stories.tsx
- center.stories.tsx
- chart.stories.tsx
- checkbox.stories.tsx
- combobox.stories.tsx
- command.stories.tsx
- container.stories.tsx
- context-menu.stories.tsx
- data-table.stories.tsx
- date-picker.stories.tsx
- dialog-enhanced.stories.tsx
- dialog.stories.tsx
- drawer.stories.tsx
- dropdown-menu-sdui.stories.tsx
- dropdown-menu.stories.tsx
- flex.stories.tsx
- form.stories.tsx
- grid.stories.tsx
- group.stories.tsx
- heading.stories.tsx
- head-manager/extended-head-manager.stories.tsx
- head-manager/head-manager.stories.tsx
- hero.stories.tsx
- hover-card.stories.tsx
- image.stories.tsx
- input.stories.tsx
- input-otp.stories.tsx
- keyboard-navigation-menu-sdui.stories.tsx
- keyboard-navigation-menu.stories.tsx
- label.stories.tsx
- loading.stories.tsx
- markdown.stories.tsx
- masonry.stories.tsx
- navigation-menu.stories.tsx
- pagination.stories.tsx
- popover.stories.tsx
- progress.stories.tsx
- radio-group.stories.tsx
- resizable.stories.tsx
- scroll-area.stories.tsx
- select.stories.tsx
- separator.stories.tsx
- sheet-sdui.stories.tsx
- sheet.stories.tsx
- simple-grid.stories.tsx
- skeleton-loader.stories.tsx
- skeleton.stories.tsx
- slider.stories.tsx
- spacer.stories.tsx
- stack.stories.tsx
- switch.stories.tsx
- table.stories.tsx
- tabs.stories.tsx
- testimonial.stories.tsx
- textarea.stories.tsx
- text.stories.tsx
- toast.stories.tsx
- toggle-group.stories.tsx
- toggle.stories.tsx
- tooltip.stories.tsx

### Library Components (1 file)
- lib/animation/animation-provider.stories.tsx

## Files with Test Tags

These story files include `tags: ['test']` in their metadata:

### Block Components (28 files)
- announcement-bar.stories.tsx
- blog-post-detail.stories.tsx
- blog-post-grid.stories.tsx
- brand-logo-bar.stories.tsx
- carousel-block.stories.tsx
- contact-form.stories.tsx
- cookie-consent-banner.stories.tsx
- error-page.stories.tsx
- event-listings.stories.tsx
- faq.stories.tsx
- feature-card.stories.tsx
- header.stories.tsx
- icon.stories.tsx
- job-listings.stories.tsx
- location-hours.stories.tsx
- newsletter-signup.stories.tsx
- page-hero-header.stories.tsx
- page-section.stories.tsx
- photo-flip-card.stories.tsx
- photo-gallery.stories.tsx
- portfolio-case-studies.stories.tsx
- pricing-table.stories.tsx
- social-share-bar.stories.tsx
- stat-block.stories.tsx
- team-grid.stories.tsx
- testimonial.stories.tsx
- timeline.stories.tsx
- typewriter-text.stories.tsx

### UI Components (16 files)
- accordion.stories.tsx
- combobox.stories.tsx
- command.stories.tsx
- dropdown-menu-sdui.stories.tsx
- hover-card.stories.tsx
- keyboard-navigation-menu-sdui.stories.tsx
- keyboard-navigation-menu.stories.tsx
- loading.stories.tsx
- markdown.stories.tsx
- select.stories.tsx
- skeleton-loader.stories.tsx
- switch.stories.tsx
- tabs.stories.tsx
- toggle-group.stories.tsx

### Library Components (1 file)
- lib/data/optimistic-updates.stories.tsx

## Files with User Interactions

These story files use `userEvent` for simulating user interactions:

### Block Components (5 files)
- call-to-action.stories.tsx
- contact-form-block.stories.tsx
- contact-form.stories.tsx
- pricing-table.stories.tsx
- sidebar.stories.tsx

### UI Components (45 files)
- accordion.stories.tsx
- alert.stories.tsx
- alert-dialog.stories.tsx
- avatar.stories.tsx
- badge.stories.tsx
- button.stories.tsx
- calendar.stories.tsx
- checkbox.stories.tsx
- combobox.stories.tsx
- command.stories.tsx
- context-menu.stories.tsx
- data-table.stories.tsx
- date-picker.stories.tsx
- dialog-enhanced.stories.tsx
- dialog.stories.tsx
- drawer.stories.tsx
- dropdown-menu-sdui.stories.tsx
- dropdown-menu.stories.tsx
- form.stories.tsx
- group.stories.tsx
- hero.stories.tsx
- hover-card.stories.tsx
- input.stories.tsx
- input-otp.stories.tsx
- keyboard-navigation-menu-sdui.stories.tsx
- keyboard-navigation-menu.stories.tsx
- label.stories.tsx
- masonry.stories.tsx
- navigation-menu.stories.tsx
- pagination.stories.tsx
- popover.stories.tsx
- radio-group.stories.tsx
- select.stories.tsx
- sheet-sdui.stories.tsx
- sheet.stories.tsx
- slider.stories.tsx
- stack.stories.tsx
- switch.stories.tsx
- tabs.stories.tsx
- textarea.stories.tsx
- toast.stories.tsx
- toggle-group.stories.tsx
- toggle.stories.tsx
- tooltip.stories.tsx

## Types of Tests Found

### Common Test Patterns

1. **Interaction Tests**
   - Click interactions (buttons, checkboxes, toggles)
   - Keyboard navigation (Tab, Enter, Arrow keys)
   - Form input and validation
   - Focus management
   - Hover and tooltip behavior

2. **State Verification**
   - Checking component states (checked/unchecked, open/closed)
   - Verifying ARIA attributes
   - Testing disabled states
   - Validating CSS classes

3. **Accessibility Tests**
   - Role verification
   - ARIA attribute testing
   - Keyboard navigation support
   - Screen reader compatibility

4. **Visual Tests**
   - Component rendering
   - Conditional content display
   - Animation behavior
   - Responsive layouts

## Example Test Structure

Typical play function structure found in these files:

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Find elements
  const button = canvas.getByRole('button');
  
  // Verify initial state
  expect(button).toBeInTheDocument();
  expect(button).not.toBeDisabled();
  
  // Perform interactions
  await userEvent.click(button);
  
  // Verify state changes
  await waitFor(() => {
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
}
```

## Coverage Summary

- Most interactive UI components have comprehensive play functions
- Form components have extensive interaction testing
- Navigation components test keyboard accessibility
- Block components have basic rendering and interaction tests
- SDUI-specific components have dedicated test stories
