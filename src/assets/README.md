# Assets Directory

The `src/assets/` directory contains **processed static resources** that are bundled, transformed, or imported into your Next.js application code.

## Directory Structure

```
src/assets/
├── fonts/           # Font-related CSS and configurations
│   └── fonts.css    # @font-face definitions
├── icons/           # SVG icons and icon components
├── images/          # Images that need webpack processing
├── styles/          # Shared CSS/SCSS files
├── data/            # Static JSON data files
└── README.md        # This file
```

## Purpose & Usage

### `src/assets/` vs `public/`

| Aspect | `src/assets/` | `public/` |
|--------|---------------|-----------|
| **Processing** | Bundled by webpack | Served directly |
| **Imports** | `import` statements | URL references |
| **Optimization** | Automatic optimization | Manual optimization |
| **Caching** | Content-based hashing | Manual cache control |
| **Examples** | CSS, SVG components, JSON | Fonts, images, favicon |

### Font Strategy

Our font loading uses a **hybrid approach**:

1. **Font files** → `public/fonts/` (direct serving)
2. **@font-face definitions** → `src/assets/fonts/fonts.css` (processed)
3. **CSS variables** → Available globally via import

```css
/* src/assets/fonts/fonts.css */
@font-face {
  font-family: 'Editorial Old';
  src: url('/fonts/ppeditorialold-regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-editorial-old: 'Editorial Old', serif;
}
```

```typescript
// src/app/layout.tsx
import '@/assets/fonts/fonts.css';

// Now available in CSS
.brand-text {
  font-family: var(--font-editorial-old);
}
```

## Import Patterns

### CSS Files
```typescript
// Global import (in layout.tsx)
import '@/assets/fonts/fonts.css';

// Component-specific import
import '@/assets/styles/components/button.css';
```

### JSON Data
```typescript
import navigationData from '@/assets/data/json/navigation.json';
import { PROPERTY_TYPES } from '@/assets/data/constants/properties';
```

### SVG Icons (as components)
```typescript
import { HomeIcon, PhoneIcon } from '@/assets/icons';

// Usage
<HomeIcon className="w-6 h-6 text-blue-600" />
```

### Images (with processing)
```typescript
import heroImage from '@/assets/images/hero-background.jpg';

// Next.js will optimize and provide responsive images
<Image src={heroImage} alt="Hero background" />
```

## Build Process

### Webpack Processing
- **CSS**: Bundled, minified, autoprefixed
- **Images**: Optimized, responsive variants generated
- **JSON**: Bundled as JavaScript modules
- **SVG**: Can be imported as React components

### Optimization Features
- **Tree shaking**: Unused assets are excluded
- **Code splitting**: Assets loaded only when needed
- **Content hashing**: Automatic cache busting
- **Compression**: Gzip/Brotli compression

## Best Practices

### 1. File Organization
```
assets/
├── fonts/
│   ├── fonts.css           # Main font definitions
│   └── font-variants.css   # Additional variants
├── icons/
│   ├── svg/               # Raw SVG files
│   ├── components/        # React icon components
│   └── index.ts          # Barrel exports
├── styles/
│   ├── components/       # Component-specific styles
│   ├── utilities/        # Utility classes
│   └── variables.css     # CSS custom properties
└── data/
    ├── json/            # Static JSON files
    └── constants/       # TypeScript constants
```

### 2. Import Conventions
```typescript
// Use absolute imports with @/ prefix
import '@/assets/fonts/fonts.css';
import { SITE_CONFIG } from '@/assets/data/constants/site';
import { HomeIcon } from '@/assets/icons';
```

### 3. TypeScript Integration
```typescript
// Type your data imports
interface NavigationItem {
  href: string;
  label: string;
}

import navigationData: NavigationItem[] from '@/assets/data/json/navigation.json';
```

### 4. Performance Considerations
- **Lazy load** large assets
- **Use CSS modules** for component styles
- **Optimize images** before adding to assets
- **Tree shake** unused exports

## Migration Notes

The assets directory was reorganized to:
1. **Separate concerns** between processed and static assets
2. **Improve font loading** with proper @font-face definitions
3. **Enable better optimization** through webpack processing
4. **Provide clear import patterns** with TypeScript support
