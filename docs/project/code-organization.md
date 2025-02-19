# Apto.rio Code Organization Guidelines

This document outlines the code organization principles for the Apto.rio project, building upon the Next.js Stripe Supabase Starter Kit.

## Directory Structure

We follow a feature-based organization with shared components and utilities:

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes (grouped by user type)
│   ├── (marketing)/      # Public marketing pages
│   ├── properties/       # Property listing and details
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── ui/               # Base UI components from starter kit
│   ├── forms/            # Form components
│   ├── properties/       # Property-specific components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
│   ├── auth/             # Authentication hooks
│   ├── properties/       # Property-related hooks
│   ├── subscription/     # Subscription-related hooks
│   └── [feature]/        # Feature-specific hooks
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client and utilities
│   ├── stripe/           # Stripe related utilities
│   ├── openai/           # OpenAI utilities
│   ├── utils/            # General utilities
│   └── constants/        # Application constants
├── store/                # State management
│   ├── slices/           # State slices
│   └── index.ts          # Store configuration
├── types/                # TypeScript type definitions
│   ├── database.ts       # Database types (from Supabase)
│   ├── api.ts            # API request/response types
│   └── [feature].ts      # Feature-specific types
└── utils/                # Shared utility functions
    ├── formatting.ts     # Formatting utilities
    ├── validation.ts     # Validation utilities
    └── helpers.ts        # General helper functions
```

## Naming Conventions

1. **Files and Directories**
   - Use kebab-case for file names: `property-card.tsx`
   - User PascalCase for component files: `PropertyCard.tsx`
   - Use camelCase for utility files: `formatCurrency.ts`

2. **Components**
   - Use PascalCase for component names: `PropertyCard`
   - Co-locate component types with the component: `PropertyCard.tsx`

3. **Hooks**
   - Prefix with `use`: `usePropertySearch.ts`
   - Return clear, descriptive objects

4. **Type Definitions**
   - Suffix interfaces with props when used for components: `PropertyCardProps`
   - Use descriptive names for database types: `PropertyWithMedia`

## Code Organization Principles

### 1. Component Structure

Components should follow this structure:
```tsx
// Imports
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Types
interface ComponentProps {
  // props definition
}

// Helper functions (component-specific)
function formatData(data) {
  // implementation
}

// Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // implementation
}

// Default export
export default Component
```

### 2. Hook Structure

Hooks should follow this structure:
```tsx
// Imports
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

// Types
interface HookParams {
  // parameters
}

interface HookResult {
  // return values
}

// Hook implementation
export function useCustomHook(params: HookParams): HookResult {
  // implementation
}
```

### 3. API Route Structure

API routes should follow this structure:
```tsx
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'

export async function GET(request: Request) {
  // authentication check
  // parameter validation
  // business logic
  // return response
}
```

## State Management

1. **React Query / Tanstack**
   - Use for server state management
   - Create custom hooks for reusable queries
   - Implement proper caching strategies

2. **React Context**
   - Use for UI state shared across components
   - Keep contexts focused and minimal

3. **Local State**
   - Use useState for component-specific state
   - Prefer lifting state up when needed

## Error Handling

1. **API Errors**
   - Use consistent error response format
   - Implement proper status codes
   - Include useful error messages

2. **UI Error Handling**
   - Use React Error Boundaries for component errors
   - Implement retry mechanisms for failed requests
   - Show user-friendly error messages

## Performance Considerations

1. **Code Splitting**
   - Use dynamic imports for large components
   - Lazy load non-critical components
   - Implement proper suspense boundaries

2. **Memoization**
   - Use React.memo for expensive renders
   - Use useMemo for expensive calculations
   - Use useCallback for functions passed to child components

3. **Image Optimization**
   - Use Next.js Image component
   - Implement proper sizing and quality
   - Use WebP when possible

## Coding Standards

1. **Linting and Formatting**
   - Follow ESLint configuration
   - Use Prettier for code formatting
   - Run lint checks before commits

2. **Comments and Documentation**
   - Document complex logic
   - Add JSDoc comments for functions
   - Keep comments up-to-date

3. **Testing**
   - Write unit tests for utilities
   - Write component tests for UI
   - Implement integration tests for workflows

By following these guidelines, we maintain a consistent, maintainable, and scalable codebase while leveraging the starter kit's existing patterns.