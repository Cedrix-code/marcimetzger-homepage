---
applyTo: "**"
---
# Project general coding standards

This document outlines the general coding standards to be followed across the entire project. These standards promote consistency, readability, and maintainability.

## Naming Conventions
- **PascalCase:** Use PascalCase for naming:
    - React Component names (e.g., `UserProfile`, `ProductCard`)
    - Interfaces (e.g., `User`, `ProductProps`)
    - Type aliases (e.g., `UserId`, `AppState`)
- **camelCase:** Use camelCase for naming:
    - Variables (e.g., `firstName`, `totalCount`)
    - Functions and methods (e.g., `getUserData`, `calculateTotalPrice`)
- **Private Members:** Prefix private class members with an underscore (`_`) (e.g., `_internalState`).
- **ALL_CAPS:** Use ALL_CAPS with underscores for separating words for constants that represent immutable values or configuration settings (e.g., `API_KEY`, `MAX_RETRIES`).

## Error Handling
- **Async Operations:** Always wrap asynchronous operations (e.g., API calls, promises) in `try...catch` blocks to gracefully handle potential errors.
- **React Error Boundaries:** Implement Error Boundaries (`componentDidCatch` or `static getDerivedStateFromError` in class components, or a custom hook/library wrapper for functional components) at appropriate levels in the React component tree to catch and display fallback UI for errors occurring during rendering, in lifecycle methods, or in constructors.
- **Logging:** Log errors with sufficient context (e.g., error message, stack trace, relevant input data, component name/location) to aid debugging. Integrate with a logging service where applicable.