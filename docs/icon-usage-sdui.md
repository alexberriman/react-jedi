# Using Icons in SDUI Mode

React Jedi now supports proper SVG icon rendering in SDUI mode through an icon registry system. Icons are no longer represented by emojis, but by actual SVG components.

## How It Works

In SDUI mode, icons are referenced using a special `Icon` component type:

```json
{
  "type": "Icon",
  "name": "settings",
  "size": 24,
  "color": "currentColor",
  "strokeWidth": 2,
  "className": "animate-spin"
}
```

## Using Icons in Buttons

### Icon with Text (Left)

```json
{
  "type": "Button",
  "children": [
    {
      "type": "Icon",
      "name": "globe",
      "size": 16
    },
    "GitHub"
  ]
}
```

### Icon with Text (Right)

```json
{
  "type": "Button",
  "children": [
    "Next",
    {
      "type": "Icon",
      "name": "chevron-right",
      "size": 16
    }
  ]
}
```

### Icon Only Button

```json
{
  "type": "Button",
  "size": "icon",
  "aria-label": "Settings",
  "children": {
    "type": "Icon",
    "name": "settings"
  }
}
```

### Loading Button with Animated Icon

```json
{
  "type": "Button",
  "disabled": true,
  "children": [
    {
      "type": "Icon",
      "name": "loader",
      "size": 16,
      "className": "animate-spin"
    },
    "Processing..."
  ]
}
```

## Available Icons

React Jedi comes with a comprehensive set of pre-registered Lucide icons:

### Alerts & Status
- `alert-circle`
- `alert-triangle`
- `check`
- `check-circle`
- `info`
- `x`
- `x-circle`

### Navigation
- `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `menu`
- `more-horizontal`, `more-vertical`

### Actions
- `copy`, `download`, `edit`, `external-link`
- `eye`, `eye-off`
- `filter`, `pencil`
- `plus`, `minus`
- `refresh`, `save`, `search`, `send`, `share`
- `trash`, `trash-2`
- `upload`

### Objects & Files
- `file`, `file-text`
- `folder`
- `package`

### User & Social
- `user`, `user-plus`, `users`
- `heart`
- `message-square`
- `thumbs-up`

### UI Elements
- `calendar`, `clock`
- `home`, `link`, `lock`, `log-out`
- `mail`, `map`, `map-pin`
- `moon`, `sun`
- `phone`, `play`
- `settings`, `shield`
- `shopping-bag`, `shopping-cart`
- `smartphone`, `star`
- `tag`, `terminal`
- `trending-up`, `unlock`
- `video`, `wifi`
- `zap`, `globe`
- `loader` (commonly used with `animate-spin` class)

## Registering Custom Icons

If you need to register additional icons, you can do so using the icon registry:

```typescript
import { iconRegistry } from "@alexberriman/react-jedi";
import { MyCustomIcon } from "./my-icons";

iconRegistry.register("my-icon", {
  component: MyCustomIcon,
  defaultSize: 24,
  defaultStrokeWidth: 2
});
```

## Icon Properties

All icon references support the following properties:

- `name` (required): The registered icon name
- `size`: Icon size in pixels (default: 24)
- `color`: Icon color (default: "currentColor")
- `strokeWidth`: Stroke width for line icons
- `className`: Additional CSS classes
- `style`: Inline styles object
- `ariaLabel`: Accessibility label

## Migration from Emoji Icons

If you have existing SDUI specifications using emoji fallbacks, update them to use proper icon references:

### Before (with emoji)
```json
{
  "type": "Button",
  "children": "⚙️ Settings"
}
```

### After (with icon component)
```json
{
  "type": "Button",
  "children": [
    {
      "type": "Icon",
      "name": "settings",
      "size": 16
    },
    "Settings"
  ]
}
```

## Notes

- Icons automatically inherit color from their parent component
- Icons are properly sized according to their container
- All icons include proper accessibility attributes
- Missing icons show a helpful placeholder in development mode
- Icons support all standard React props and event handlers