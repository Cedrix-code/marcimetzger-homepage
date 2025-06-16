# Project Structure

This Next.js 14+ App Router project follows modern best practices for folder organization and code structure.

## Directory Structure

```
src/
├── app/                    # Next.js App Router directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   ├── loading.tsx        # Loading UI component
│   ├── error.tsx          # Error UI component
│   ├── not-found.tsx      # 404 page component
│   ├── global-error.tsx   # Global error UI component
│   ├── robots.txt         # Robots.txt file
│   ├── sitemap.ts         # Sitemap generation
│   └── favicon.ico        # Favicon
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   ├── layout/           # Layout-specific components (Header, Footer, Navigation, BurgerMenu)
│   ├── sections/         # Page section components (Hero, About, Services, etc.)
│   ├── features/         # Feature-specific components
│   └── LenisInitializer.tsx # Smooth scrolling component
├── lib/                  # Utility libraries and configurations
│   ├── animations.ts     # GSAP animation utilities
│   ├── utils.ts          # General utility functions
│   ├── validations.ts    # Form/data validation schemas
│   ├── constants.ts      # Application constants
│   └── metadata.ts       # SEO metadata configuration
├── hooks/                # Custom React hooks
│   ├── useScrollDirection.ts # Scroll direction detection
│   └── useLocalStorage.ts    # localStorage with SSR support
├── types/                # TypeScript type definitions
│   └── index.ts          # Global type definitions
├── stores/               # State management (Zustand, Redux, etc.)
├── assets/               # Processed static assets
│   ├── fonts/           # Font-related CSS and configurations
│   │   └── fonts.css    # @font-face definitions
│   ├── icons/           # SVG icons and icon components
│   ├── images/          # Images that need webpack processing
│   ├── styles/          # Shared CSS/SCSS files
│   └── data/            # Static JSON data files
├── config/               # Environment variables and app configuration
│   └── site.ts           # Site configuration
└── README.md             # This file
```

## Key Principles

### 1. Separation of Concerns
- **`app/`**: Next.js routing and page components only
- **`components/`**: Reusable UI components organized by purpose
- **`lib/`**: Utility functions, constants, and configurations
- **`hooks/`**: Custom React hooks for shared logic
- **`types/`**: TypeScript type definitions

### 2. Import Conventions
- Use absolute imports with `@/` prefix (configured in `tsconfig.json`)
- Example: `import { Button } from '@/components/ui/Button'`

### 3. Component Organization
- **`ui/`**: Basic, reusable UI components (buttons, inputs, modals)
- **`layout/`**: Layout-specific components (header, footer, navigation)
- **`sections/`**: Page section components (hero, about, services)
- **`features/`**: Feature-specific components with business logic

### 4. File Naming
- Use PascalCase for component files: `BurgerMenu.tsx`
- Use camelCase for utility files: `animations.ts`
- Use kebab-case for configuration files: `site-config.ts`

## Usage Examples

### Importing Components
```typescript
// Layout components
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// Section components
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

// Utilities
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

// Types
import type { NavigationItem } from '@/types'

// Hooks
import { useScrollDirection } from '@/hooks/useScrollDirection'
```

### Adding New Components
1. **UI Component**: Add to `src/components/ui/`
2. **Layout Component**: Add to `src/components/layout/`
3. **Section Component**: Add to `src/components/sections/`
4. **Feature Component**: Add to `src/components/features/`

### Adding Utilities
1. **General utilities**: Add to `src/lib/utils.ts`
2. **Constants**: Add to `src/lib/constants.ts`
3. **Validations**: Add to `src/lib/validations.ts`
4. **Animations**: Add to `src/lib/animations.ts`

### Adding Types
Add TypeScript types to `src/types/index.ts` or create specific type files for complex domains.

### Adding Hooks
Create custom hooks in `src/hooks/` following the `use` prefix convention.

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Follow the single responsibility principle**
4. **Use absolute imports with `@/` prefix**
5. **Organize files by feature/purpose, not by file type**
6. **Keep business logic in custom hooks or utility functions**
7. **Use proper TypeScript types for all props and functions**

## Migration Notes

This structure was reorganized from a previous setup to follow Next.js 14+ App Router best practices. All existing functionality has been preserved while improving code organization and maintainability.
