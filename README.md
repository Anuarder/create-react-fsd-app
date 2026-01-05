# create-react-fsd-app

A CLI tool to scaffold Feature-Sliced Design React applications with TypeScript, Vite, TanStack Query, and Tailwind CSS.

## Features

- 🎨 **Feature-Sliced Design** architecture out of the box
- ⚡ **Vite** for blazing fast development
- 🎯 **TypeScript** with strict configuration
- 🎨 **Tailwind CSS** for styling
- 🔄 **TanStack Query** for server state management
- 🐻 **Zustand** ready for client state
- 🧪 **Vitest** for testing
- 📏 **ESLint** with comprehensive rules
- 💅 **Prettier** with import sorting
- 🪝 **Optional Git Hooks** for branch naming and commit validation

## Usage

### Using Bun (Recommended)

```bash
bun run /path/to/create-react-fsd-app/src/index.ts
```

### After Building

```bash
# Build the CLI
cd create-react-fsd-app
bun install
bun run build

# Run the CLI
./dist/index.js
```

### Interactive Prompts

The CLI will ask you:

1. **Project name** - Name of your project (lowercase with hyphens)
2. **Create git hooks?** - Whether to include git hooks for linting and commit validation
3. **Enforce branch naming rules?** - (Only if git hooks enabled) Whether to validate branch names
4. **Ticket prefix** - (Only if branch naming enabled) Your ticket system prefix (e.g., "kan", "jira", "ticket")

## Generated Project Structure

```
my-app/
├── CLAUDE.md                    # AI coding rules and standards
├── .gitignore
├── package.json
├── .npmrc                       # NPM configuration
├── .prettierrc
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── .env
├── .env.example
├── git-hooks/                   # Optional: Git hooks
│   ├── commit-msg              # Validates commit message length
│   ├── pre-commit              # Runs linting on staged files
│   ├── post-checkout           # Validates branch naming
│   ├── README.md
│   └── utils/
│       └── lint.sh
├── public/
│   └── vite.svg
└── src/
    ├── vite-env.d.ts
    ├── app/
    │   ├── index.html
    │   ├── index.tsx
    │   ├── css/
    │   │   └── styles.css
    │   └── providers/
    │       ├── index.ts
    │       ├── routes/
    │       │   └── index.tsx
    │       └── tanstack-query/
    │           └── index.tsx
    ├── entities/
    │   └── .gitkeep
    ├── modules/
    │   └── README.md
    └── shared/
        ├── index.ts
        ├── api/
        │   └── .gitkeep
        ├── assets/
        │   └── .gitkeep
        ├── config/
        │   ├── index.ts
        │   └── env.ts
        ├── lib/
        │   └── .gitkeep
        └── ui/
            └── .gitkeep
```

## After Project Creation

1. Navigate to your project:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. (Optional) If you enabled git hooks:
   ```bash
   git init
   chmod +x git-hooks/*
   chmod +x git-hooks/utils/*
   git config core.hooksPath git-hooks
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report

## Path Aliases

The project comes with pre-configured path aliases:

- `~` - Source root (`./src`)
- `~app` - App directory (`./src/app`)
- `~shared` - Shared modules (`./src/shared`)
- `~entities` - Business entities (`./src/entities`)
- `~modules` - Feature modules (`./src/modules`)

Example:
```typescript
import { env } from '~shared/config';
import { UserCard } from '~modules/user';
```

## Coding Standards

The generated project includes comprehensive coding standards in `CLAUDE.md`:

- **File naming**: PascalCase for React components, kebab-case for TypeScript files
- **Component naming**: Must have at least 2 words (e.g., `UiButton`, not `Button`)
- **Styling**: Tailwind CSS only, no custom CSS
- **State management**: TanStack Query for server state, Zustand for client state
- **Import order**: Enforced by Prettier
- **TypeScript**: Strict mode with explicit return types
- **Testing**: Vitest with React Testing Library

## Git Hooks (Optional)

If enabled, the project includes:

### commit-msg
Validates commit message length (3-100 characters)

### pre-commit
Runs ESLint and Prettier on staged files

### post-checkout
- **With branch naming validation**: Validates branch naming convention
  - Format: `<type>/<ticket-prefix>-<number>`
  - Allowed types: `feature`, `feat`, `fix`, `hotfix`, `bugfix`, `maintenance`, `infra`, `epic`
  - Example: `feature/kan-123`
- **Without branch naming validation**: Placeholder hook for future extensions

## Tech Stack

- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Styling
- **TanStack Query 5** - Server state management
- **Zustand 5** - Client state management
- **React Router 7** - Routing
- **Vitest 2** - Testing framework
- **ESLint 9** - Linting
- **Prettier 3** - Code formatting

## Development

To work on the CLI itself:

```bash
cd create-react-fsd-app
bun install
bun run dev  # Run in development mode
bun run build  # Build for production
```

## License

MIT

