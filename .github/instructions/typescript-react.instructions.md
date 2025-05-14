---
applyTo: "**/*.ts,**/*.tsx"
---
# GitHub Copilot Instructions: React 19 & Next.js (Latest) Development

As a GitHub Copilot assisting with this project, adhere to the following guidelines when generating or suggesting code in `.ts` and `.tsx` files. These instructions build upon the general coding standards (as referenced in `./general-coding.instructions.md`) and the specific standards outlined in the project's documentation, while incorporating best practices for React 19 and the latest Next.js App Router conventions.

**General Principle:** Prioritize clarity, maintainability, performance, and adherence to project conventions over cleverness or brevity. Understand the context (Server Component vs. Client Component) and generate code appropriate for that context.

## Core Project Standards (Reinforce & Apply)

Follow the rules detailed in the project's coding standards document:

1.  **TypeScript:**
    -   Always use TypeScript. Provide explicit types where beneficial, leveraging inference otherwise.
    -   Embrace functional programming principles; prefer pure functions and avoid side effects where possible.
    -   Use `interface` for defining the shape of objects and types.
    -   Prefer immutability using `const` and `readonly`. Avoid direct state/prop mutation.
    -   Utilize optional chaining (`?.`) and nullish coalescing (`??`) for safer property access and default values.

2.  **React:**
    -   Generate **functional components** using hooks. Avoid class components.
    -   Strictly follow the **React Hooks Rules**: Do not call hooks conditionally, in loops, or nested functions (except for custom hooks).
    -   Use the `React.FC` type definition specifically for components that are expected to receive and render `children`. For components without children or where children are not explicitly required, a simple type definition for props is sufficient.
    -   Keep components **small, focused, and reusable**. Break down complex UI or logic into smaller components.
    -   Assume and use **CSS Modules** for component-specific styling. Import styles like `import styles from './ComponentName.module.css';` and apply classes as `className={styles.myClass}`.

## React 19 Specific Guidelines

-   **Leverage New APIs:** Be aware of and suggest using new or improved APIs in React 19 where appropriate:
    -   `useActionState` and `useFormStatus` for handling form states and server actions.
    -   The `use` hook for reading resources like Promises or Context within components (primarily for Server Components or specific Client Component patterns).
    -   Optimistic updates using `useOptimistic`.
-   **Understanding Actions:** Generate code using React Actions (passed to form `action` prop or button `formAction`) for mutations and server interactions, especially in the context of Next.js Server Actions.

## Latest Next.js (App Router) Specific Guidelines

-   **Server Components First:** Assume components within the `app` directory are Server Components by default, unless a `'use client'` directive is present.
    -   **Server Component Code:** Do NOT use hooks like `useState`, `useEffect`, `useRef`, etc., or browser-specific APIs (`window`, `document`) in Server Components. Server Components can be `async`.
    -   **Client Component Code:** Use the `'use client'` directive at the top of the file. Client Components can use hooks and browser APIs.
-   **Data Fetching:**
    -   Prefer `async` Server Components with top-level `await` for data fetching using the enhanced `fetch` API.
    -   Understand and utilize Next.js's caching, revalidating, and memoizing behaviors with `fetch`.
-   **Routing:** Adhere to the App Router file-based conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts` for API routes, etc.).
-   **Server Actions:** Suggest Server Actions for handling data mutations and form submissions (`'use server'` directive in a file or inside a function).
-   **Built-in Components:** Prefer Next.js built-in components where applicable:
    -   `next/image` for images (always specify `alt` prop).
    -   `next/link` for client-side navigation.
-   **Metadata:** Use the Metadata API (exporting `metadata` or `generateMetadata` in `layout.tsx` or `page.tsx`) for handling page metadata.
-   **Route Handlers:** Generate `route.ts` files for creating API endpoints within the `app` directory, using standard Request/Response objects.

## Code Generation & Suggestions

-   When generating new components or files, include necessary imports (`import React from 'react';` if using JSX/TSX syntax, imports for hooks, types, Next.js components, etc.).
-   Provide sensible default props or interfaces based on common patterns.
-   Suggest breaking down large components or functions.
-   Highlight potential performance improvements (e.g., using `next/dynamic` for dynamic imports, optimizing data fetches).
-   If asked to implement a feature, suggest the Next.js/React 19 idiomatic way (e.g., Server Actions for forms, async Server Components for data fetching).

By following these instructions, you will help ensure consistency, maintainability, and leverage the full capabilities of React 19 and the latest Next.js framework within this project. If there's ambiguity or multiple valid approaches, provide the preferred one based on these guidelines or offer a few options with justifications.