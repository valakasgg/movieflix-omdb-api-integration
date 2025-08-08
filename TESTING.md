# Testing in Movie Search App

This document provides an overview of the testing setup in the Movie Search application.

## Testing Stack

- **Jest**: Main testing framework
- **React Testing Library**: For testing React components and hooks
- **SWR Mock**: For testing components that use SWR for data fetching
- **Redux Test Utilities**: For testing Redux-connected components and slices

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (useful during development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Test Structure

The tests are organized following the same structure as the application code:

```
src/
  app/
    components/
      component-name/
        __tests__/
          Component.test.tsx
    hooks/
      __tests__/
        hook-name.test.ts
    redux/
      __tests__/
        slice-name.test.ts
      slices/
        __tests__/
          slice-name.test.ts
```

## Testing Approach

### Component Tests

- Components are tested in isolation using mocks for dependencies
- User interactions are simulated using React Testing Library's fireEvent
- Visual elements and text content are verified
- Complex components are tested with Redux store using custom renderWithProviders utility

### Hook Tests

- Custom hooks are tested using renderHook from React Testing Library
- External dependencies like SWR are mocked
- Both success and error states are tested

### Redux Tests

- Redux slices are tested by dispatching actions and verifying state changes
- Side effects like localStorage interactions are tested using mocks
- Selectors are tested with different state configurations

## Mock Strategy

- **Redux**: Uses a real store with configurable preloaded state
- **Next.js**: Navigation, router, and Link component are mocked
- **localStorage**: Mocked with in-memory implementation
- **SWR**: Data fetching is mocked with predefined responses
- **Framer Motion**: UI animations are simplified in tests

## Coverage Report

As of the latest run, the test coverage is:

- Statements: 86.55%
- Branches: 80.43%
- Functions: 72.82%
- Lines: 86.97%

## Adding New Tests

When adding new features, follow these best practices:

1. Create test files alongside the component/hook/slice
2. Test both success and error paths
3. Mock external dependencies
4. For UI components, test user interactions and visual states
5. For Redux, test actions, reducers, and selectors

## Debugging Tests

If a test is failing:

1. Check the error message for specific component/assertion failures
2. Use `screen.debug()` to output the current DOM state
3. Ensure mocks are properly set up for external dependencies
4. Verify that components are wrapped with necessary providers (Redux, etc.)
