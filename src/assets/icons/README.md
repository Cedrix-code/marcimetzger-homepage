# Icons Directory

This directory contains SVG icons and icon components for the application.

## Organization

- **`svg/`** - Raw SVG files
- **`components/`** - React icon components
- **`index.ts`** - Barrel exports for all icons

## Usage

```typescript
// Import individual icons
import { HomeIcon, PhoneIcon } from '@/assets/icons'

// Use in components
<HomeIcon className="w-6 h-6 text-blue-600" />
```

## Adding New Icons

1. Add SVG file to `svg/` directory
2. Create React component in `components/`
3. Export from `index.ts`
4. Use TypeScript for proper typing
