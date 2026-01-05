export function generateClaudeRules(projectName: string): string {
  return `# ${projectName} Project - Claude AI Coding Rules

> This document contains comprehensive coding standards and conventions for the ${projectName} project.
> When working on this project, always follow these rules to maintain consistency.

---

## 🌍 Language & Communication

- **Always respond in English**
- All code comments must be in English
- All variable names, function names, and identifiers must be in English
- Documentation and commit messages must be in English

---

## 📚 Documentation & Library References

- When you need information about libraries, frameworks, or APIs, **look up official documentation**
- **Do NOT guess** API signatures or make assumptions about library behavior
- Always fetch up-to-date official documentation when uncertain
- Common libraries in this project:
  - React, TanStack Query (React Query), Zustand, axios, React Router, Vite, TypeScript

---

## 📁 File Naming Conventions

### Source Files (\`src/\`)

- **React components**: \`PascalCase\`
  - Examples: \`AuthPasswordField.tsx\`, \`SignUpForm.tsx\`, \`UserProfile.tsx\`
- **TypeScript/JavaScript files**: \`kebab-case\`
  - Examples: \`use-input-error-tooltip.ts\`, \`auth-service.ts\`, \`validation-helpers.ts\`
- **Folders**: \`kebab-case\`
  - Examples: \`auth-app/\`, \`shared/ui/\`, \`password-reset/\`
- These conventions are enforced by ESLint

### Public/Assets (\`public/\`)

- **Asset files**: \`kebab-case\`
  - Examples: \`main-logo.svg\`, \`hero-image.jpg\`, \`user-avatar.png\`
- **Folders**: \`kebab-case\`
  - Examples: \`public/images/\`, \`public/assets/\`

---

# 🎨 Coding Standards

## Code Formatting (Prettier)

- Use single quotes (\`'\`) not double quotes (\`"\`)
- Semicolons are required at the end of statements
- Maximum line length: 100 characters
- Trailing commas: ES5 style (in objects, arrays)
- Bracket spacing: enabled \`{ foo: bar }\`

## Styling Standards

**ALWAYS use Tailwind CSS for styling** - do not write custom CSS unless absolutely necessary.

### Tailwind CSS Usage

- ✅ **Use Tailwind CSS** for all styling in:
  - React components
  - All user-facing interfaces

### When to Write Custom CSS

Custom CSS should be avoided in favor of Tailwind utility classes. Only write custom CSS when:
- Creating complex animations that Tailwind doesn't support (very rare)
- Dealing with third-party components that require custom styling
- Implementing browser-specific fixes that can't be done with Tailwind

### Best Practices

\`\`\`tsx
// ✅ Correct: Use Tailwind utilities
function Card() {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900">Title</h2>
      <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
        Click me
      </button>
    </div>
  );
}

// ❌ Wrong: Custom CSS with styled-components or CSS modules
\`\`\`

### Key Points

- Tailwind provides utility classes for almost everything: layout, spacing, colors, typography, shadows, borders, transitions
- Use Tailwind's responsive utilities (\`sm:\`, \`md:\`, \`lg:\`, \`xl:\`, \`2xl:\`) for responsive design
- Use Tailwind's state variants (\`hover:\`, \`focus:\`, \`active:\`, \`disabled:\`) for interactive states
- Leverage Tailwind's color palette and spacing scale for consistency
- Use \`@apply\` directive in CSS only when absolutely necessary (prefer inline utilities)

## Import Order

Always organize imports in this exact order:

\`\`\`typescript
// 1. React and third-party modules (node_modules)
import { useState, useEffect } from 'react';
import axios from 'axios';

// 2. ~shared alias imports
import { useApi } from '~shared/hooks';
import { UiButton } from '~shared/ui';

// 3. ~entities alias imports
import { User } from '~entities/user';

// 4. ~modules alias imports
import { AuthService } from '~modules/auth';

// 5. ~ alias imports (app-specific)
import { config } from '~/config';

// 6. Relative imports
import { validateEmail } from './validators';
import type { User } from '../types';
\`\`\`

## Function Declarations

- **Prefer function declarations** over arrow function expressions for named functions
- ✅ Correct: \`function calculateTotal() { }\`
- ❌ Avoid: \`const calculateTotal = () => { }\`
- Arrow functions are acceptable for:
  - Callbacks (e.g., \`array.map(() => {})\`)
  - Array methods (e.g., \`filter\`, \`reduce\`)
  - Inline/anonymous functions
  - Event handlers in JSX

## Async Operations Syntax

- **Prefer promise syntax** (\`.then()/.catch()\`) for simple async operations
- Use \`async/await\` when it clearly improves readability (e.g., sequential operations)

## React Best Practices

- Use functional components with hooks
- Custom hooks for shared logic (prefix with \`use\`, e.g., \`useAuth\`, \`useValidation\`)
- Define props using TypeScript interfaces
- Use proper typing for all props and state

### Component Naming Convention

**IMPORTANT**: All component names MUST have at least 2 words
- ✅ Correct: \`UiButton\`, \`AuthForm\`, \`UserCard\`, \`DataTable\`, \`ModalDialog\`
- ❌ Wrong: \`Button\`, \`Form\`, \`Card\`, \`Table\`, \`Modal\`

This helps avoid naming conflicts with HTML elements and third-party libraries, and makes component purpose clearer.

### Component Structure

\`\`\`tsx
interface UiButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

function UiButton({ label, variant = 'primary', disabled, onClick }: UiButtonProps): JSX.Element {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={variant === 'primary' ? 'bg-blue-600' : 'bg-gray-600'}
    >
      {label}
    </button>
  );
}

export { UiButton };
\`\`\`

### Hooks Best Practices

- Use \`useState\` for local component state
- Use \`useEffect\` for side effects with proper cleanup
- Use \`useCallback\` for memoizing callbacks passed to children
- Use \`useMemo\` for expensive computations
- Use \`useRef\` for DOM references and mutable values that don't trigger re-renders
- Always include all dependencies in dependency arrays

\`\`\`tsx
// ✅ Correct: Proper cleanup in useEffect
useEffect(() => {
  const controller = new AbortController();
  
  fetchData(controller.signal);
  
  return () => {
    controller.abort();
  };
}, [fetchData]);
\`\`\`

## TypeScript Standards

- Always provide explicit return types for functions
- Prefer \`interface\` over \`type\` for object shapes
- Avoid \`any\` type - use \`unknown\` if type is truly uncertain
- Use type guards and type narrowing
- Define props interfaces separately for reusability

Example:

\`\`\`typescript
interface UiButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function formatUser(user: User): string {
  // Explicit return type
  return \`\${user.firstName} \${user.lastName}\`;
}
\`\`\`

## Control Flow

- **Always use curly braces** for all control statements (enforced by ESLint)
- This applies to: \`if\`, \`else\`, \`for\`, \`while\`, \`do-while\`

✅ Correct:

\`\`\`typescript
if (condition) {
  doSomething();
}

for (const item of items) {
  process(item);
}
\`\`\`

❌ Wrong:

\`\`\`typescript
if (condition) doSomething();

for (const item of items) process(item);
\`\`\`

## Architecture Pattern: Feature-Sliced Design (FSD)

This project follows **Feature-Sliced Design**:

- Structure: \`entities/\`, \`modules/\`, \`shared/\`, \`ui/\`, \`api/\`, \`lib/\`
- Each feature is self-contained
- Dependencies flow downward: \`modules\` → \`entities\` → \`shared\`

### Directory Structure

\`\`\`
${projectName}/
├── src/
│   ├── app/              # Application layer
│   │   ├── index.html   # Entry HTML
│   │   ├── index.tsx    # Entry point
│   │   ├── css/         # Global styles
│   │   └── providers/   # App providers (routes, query, etc.)
│   ├── entities/         # Business entities
│   ├── modules/          # Feature modules
│   │   └── <module>/
│   │       ├── features/ # User features/scenarios
│   │       ├── pages/    # Page components
│   │       └── entities/ # Module-specific entities (optional)
│   └── shared/           # Shared across app
│       ├── ui/          # Reusable UI components
│       ├── api/         # API clients
│       ├── lib/         # Utilities
│       └── config/      # Configuration
├── public/              # Static assets
├── git-hooks/           # Git hooks (optional)
├── package.json
├── vite.config.ts
└── tailwind.config.ts
\`\`\`

## Component Best Practices

- Define props with TypeScript interfaces
- Use semantic HTML elements (\`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`)
- Include ARIA attributes for accessibility when needed
- Handle loading and error states for async operations
- Use try-catch blocks for error handling
- Use \`useRef\` for DOM element references
- Always clean up side effects in useEffect return function

## Tailwind CSS Transitions & Animations

**ALWAYS use Tailwind CSS** for transitions and animations instead of custom CSS or JavaScript-based animations.

### Common Tailwind Transition Patterns

**Durations** (use appropriate timing):
- Fast interactions: \`duration-150\` (150ms)
- Standard: \`duration-200\` or \`duration-300\` (200-300ms)
- Slower, more deliberate: \`duration-500\` (500ms)

**Easing functions**:
- \`ease-linear\` - Constant speed
- \`ease-in\` - Starts slow, ends fast (good for exits)
- \`ease-out\` - Starts fast, ends slow (good for entrances)
- \`ease-in-out\` - Slow at both ends (good for hover effects)

**Common transition properties**:
- \`transition-opacity\` - Fade effects
- \`transition-transform\` - Move/scale effects
- \`transition-colors\` - Color changes
- \`transition-all\` - All properties (use sparingly for performance)

### Best Practices

- ✅ Use Tailwind transition utilities for all animations
- ✅ Prefer \`ease-out\` for enter animations, \`ease-in\` for leave animations
- ✅ Keep durations short (200-300ms) for better UX
- ✅ Use \`transition-all\` sparingly (prefer specific properties for performance)
- ✅ Test transitions on slower devices
- ❌ Avoid custom CSS \`@keyframes\` unless absolutely necessary
- ❌ Avoid JavaScript animation libraries (GSAP, anime.js) for simple transitions

## Error Handling & Promise Syntax

### Promise Syntax Preference

- **Prefer regular promise syntax** (\`.then()/.catch()\`) for straightforward async operations
- Use \`async/await\` only when it clearly improves readability (e.g., multiple sequential operations)
- Choose the syntax that makes the code most readable for the specific case

\`\`\`typescript
// ✅ Good: Promise syntax for simple operations
function fetchData(): Promise<Data> {
  return api.getData()
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to fetch data:', error);
      throw error;
    });
}

// ✅ Good: async/await when it's clearer (sequential operations)
async function fetchUserWithPosts(userId: string): Promise<UserWithPosts> {
  try {
    const user = await api.getUser(userId);
    const posts = await api.getUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
\`\`\`

## TanStack Query (React Query)

- **Always prefer TanStack Query** for server state management and data fetching
- Provides automatic caching, background updates, and request deduplication
- Use \`useQuery\` for GET requests (fetching data)
- Use \`useMutation\` for POST/PUT/DELETE requests (modifying data)

### useQuery Example

\`\`\`typescript
import { useQuery } from '@tanstack/react-query';

// With promise syntax (preferred for simple operations)
function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId).then((response) => response.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// In component
const { data, isLoading, isError, error } = useUserProfile(userId);
\`\`\`

### useMutation Example

\`\`\`typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: User) => api.updateUser(userData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

// In component
const { mutate, isPending } = useUpdateUser();
\`\`\`

### TanStack Query Best Practices

- Use meaningful queryKey arrays for cache management
- Set appropriate \`staleTime\` and \`gcTime\` values
- Invalidate queries after mutations to refresh data
- Handle loading and error states from TanStack Query
- Extract query logic into custom hooks (e.g., \`useUserData\`, \`useMatchList\`)
- ❌ Avoid: Manual state management for server data (use TanStack Query instead)

## Project-Specific Context

### Tech Stack

- **React** with TypeScript
- **State Management**: Zustand (for local state)
- **Server State**: TanStack Query (React Query) for data fetching and caching
- **Testing**: Vitest with React Testing Library
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Node Version**: >= 20.10.0
- **Package Manager**: npm >= 10.2.3

### Path Aliases

- \`~\` - Source root directory
- \`~app\` - App directory
- \`~shared\` - Shared modules
- \`~entities\` - Business entities
- \`~modules\` - Feature modules

## When Creating New Files

1. Check existing patterns in similar features first
2. Follow the Feature-Sliced Design structure
3. Apply correct naming conventions (PascalCase for React components, kebab-case for TS)
4. Include proper TypeScript types
5. Add JSDoc comments for complex functions
6. Consider accessibility from the start

## When Refactoring

1. Extract repeated logic into custom hooks
2. Move reusable components to \`shared/ui/\`
3. Keep components focused and single-responsibility
4. Maintain backward compatibility unless breaking changes are discussed
5. Update tests after refactoring

## Performance Considerations

- Use \`useMemo\` for expensive computations
- Use \`useCallback\` for callbacks passed to memoized children
- Use \`React.memo\` for components that receive the same props frequently
- Lazy load heavy components with \`React.lazy\` and \`Suspense\`
- Implement virtual scrolling for long lists
- Optimize images and assets

---

# 🌐 Project-Wide Rules

## Git Commit Standards

**Commit Messages:**
- Keep messages between **3-100 characters**
- No strict format required (we use squash merges to main)
- Write naturally and descriptively

**Examples:**
- ✅ \`fix login redirect issue\`
- ✅ \`add user authentication\`
- ✅ \`wip\` (work in progress)
- ❌ \`ab\` (too short)

**Branch Naming Convention:**
- Format: \`<type>/<ticket-prefix>-<number>\`
- Allowed types: \`feature\`, \`feat\`, \`fix\`, \`hotfix\`, \`bugfix\`, \`maintenance\`, \`infra\`, \`epic\`
- Examples:
  - ✅ \`feature/ticket-123\`
  - ✅ \`fix/ticket-456\`
  - ✅ \`infra/ticket-789\`
  - ❌ \`my-feature\` (missing type and ticket)

**Note:** Since we use squash merges to main, individual commit messages don't need to be perfect. Focus on descriptive squash commit messages when merging.

## Do NOT

- Do not use \`var\`, always use \`const\` or \`let\` in TypeScript/JavaScript
- Do not mutate props directly in React components
- Do not use class components (use functional components with hooks)
- Do not use \`any\` type without strong justification
- Do not skip TypeScript errors with \`@ts-ignore\` without explanation
- Do not create arrow function expressions for named functions
- Do not manually manage server state with useState (use TanStack Query)
- Do not write custom CSS - use Tailwind CSS utility classes instead
- Do not create components with single-word names (use \`UiButton\` not \`Button\`)
- Do not commit commented-out code (remove it)
- Do not create files with inconsistent naming conventions
- Do not guess library APIs - look up documentation
- Do not skip tests or linting checks
- Do not commit directly to \`main\` or \`master\` branches
- Do not commit \`.env\` files or secrets

---

## 📝 Summary

This project uses:

- **React** + **TypeScript** + **Vite** + **TanStack Query** + **Zustand** + **Tailwind CSS** (no custom CSS!)
- **Testing**: Vitest with React Testing Library
- **Architecture**: Feature-Sliced Design
- **Routing**: React Router

**Key Styling Rule**: Always use Tailwind CSS utility classes for styling. Never write custom CSS unless absolutely necessary.

Always prioritize code quality, type safety, accessibility, and maintainability!
`;
}

