# Data Directory

This directory contains static JSON data files and TypeScript data modules.

## Organization

- **`json/`** - Static JSON data files
- **`constants/`** - TypeScript data constants
- **`mock/`** - Mock data for development/testing

## Usage

```typescript
// Import JSON data
import navigationData from '@/assets/data/json/navigation.json'

// Import TypeScript constants
import { PROPERTY_TYPES } from '@/assets/data/constants/properties'
```

## Best Practices

1. Use TypeScript for type-safe data
2. Keep data files small and focused
3. Use proper naming conventions
4. Validate data structure with TypeScript types
