# Styles Directory

This directory contains shared CSS/SCSS files that are imported into components or the global stylesheet.

## Organization

- **`components/`** - Component-specific styles
- **`utilities/`** - Utility classes and mixins
- **`variables/`** - CSS custom properties and SCSS variables
- **`animations/`** - Keyframe animations and transitions

## Usage

```typescript
// Import styles in components
import '@/assets/styles/components/button.css'

// Import in global CSS
@import '@/assets/styles/utilities/spacing.css';
```

## Best Practices

1. Use CSS Modules for component-specific styles
2. Keep global styles minimal
3. Use CSS custom properties for theming
4. Organize by feature/component
