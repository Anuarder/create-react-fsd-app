# create-react-fsd-app

[![npm version](https://img.shields.io/npm/v/create-react-fsd-app.svg)](https://www.npmjs.com/package/create-react-fsd-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.10.0-brightgreen)](https://nodejs.org/)

🚀 A modern CLI tool to scaffold **Feature-Sliced Design** React applications with best practices baked in.

Get started with a production-ready React app featuring TypeScript, Vite, TanStack Query, Tailwind CSS, and comprehensive tooling in seconds!

## Why Feature-Sliced Design?

[Feature-Sliced Design (FSD)](https://feature-sliced.design/) is an architectural methodology for frontend projects that provides:

- 📦 **Clear project structure** - Easy to navigate and understand
- 🔒 **Isolation** - Features don't depend on each other
- 🎯 **Scalability** - Grows with your project without becoming messy
- 👥 **Team collaboration** - Multiple developers can work without conflicts
- 🧪 **Testability** - Well-structured code is easier to test

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

## Quick Start

Create a new React FSD app with a single command:

```bash
# Using npm
npm create react-fsd-app@latest

# Using yarn
yarn create react-fsd-app

# Using pnpm
pnpm create react-fsd-app

# Using bun
bun create react-fsd-app
```

Or use npx:

```bash
npx create-react-fsd-app@latest
```

### Interactive Prompts

The CLI will guide you through a simple setup process:

```bash
🚀 Welcome to create-react-fsd-app!

This CLI will help you scaffold a Feature-Sliced Design React application.

✔ What is your project name? … my-awesome-app
✔ Create git hooks? … yes
✔ Do you want to enforce branch naming rules? … yes
✔ What is your ticket prefix? (e.g., "kan" for kan-123) … jira

📦 Creating project: my-awesome-app...
✅ Directory structure created
✅ All files generated
✅ Project created successfully!

📝 Next steps:

  cd my-awesome-app
  npm install
  npm run dev

🪝 Git hooks have been set up. To activate them:

  git init
  chmod +x git-hooks/*
  chmod +x git-hooks/utils/*
  git config core.hooksPath git-hooks

📋 Branch naming convention: <type>/jira-<number>
   Example: feature/jira-123

Happy coding! 🎉
```

**Prompts explained:**

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

| Category | Technology | Version |
|----------|-----------|---------|
| UI Library | React | 19 |
| Language | TypeScript | 5.7 |
| Build Tool | Vite | 6 |
| Styling | Tailwind CSS | 4 |
| Server State | TanStack Query | 5 |
| Client State | Zustand | 5 |
| Routing | React Router | 7 |
| Testing | Vitest | 2 |
| Linting | ESLint | 9 |
| Formatting | Prettier | 3 |

## Comparison with Other Tools

| Feature | create-react-fsd-app | create-react-app | Vite | Next.js |
|---------|---------------------|------------------|------|---------|
| Feature-Sliced Design | ✅ | ❌ | ❌ | ❌ |
| TypeScript (Strict) | ✅ | ⚠️ Basic | ⚠️ Basic | ✅ |
| Modern Build Tool | ✅ Vite | ❌ Webpack | ✅ Vite | ✅ Turbopack |
| State Management | ✅ Pre-configured | ❌ | ❌ | ❌ |
| Path Aliases | ✅ | ❌ | ⚠️ Manual | ✅ |
| Git Hooks | ✅ Optional | ❌ | ❌ | ❌ |
| Coding Standards | ✅ CLAUDE.md | ❌ | ❌ | ❌ |
| Architecture Guide | ✅ | ❌ | ❌ | ⚠️ App Router |

## FAQ

### What is Feature-Sliced Design?

Feature-Sliced Design is an architectural methodology that organizes code by features and layers, making it easier to scale and maintain large applications. [Learn more](https://feature-sliced.design/)

### Can I use this with an existing project?

This tool is designed for new projects. For existing projects, you'll need to manually migrate to the FSD structure.

### Do I need to use all the included technologies?

The generated project includes opinionated choices for best practices. However, you can remove or replace any technology after generation (e.g., swap Zustand for Redux, or remove TanStack Query if you don't need it).

### What's the difference between `entities` and `modules`?

- **entities** - Shared business entities used across multiple features (e.g., User, Product)
- **modules** - Self-contained feature modules with their own pages and features (e.g., auth module with login/register)

### Can I customize the generated project structure?

Currently, the CLI generates a fixed structure. If you need customization, you can fork the repository and modify the templates in `src/templates/`.

### Why Node.js >= 20.10.0?

The CLI uses modern Node.js features and ESM modules. Node 20 LTS provides the best stability and performance.

### Is this production-ready?

Yes! The generated project includes:
- Strict TypeScript configuration
- Comprehensive linting rules
- Testing setup with Vitest
- Production build optimization with Vite
- Environment variable management
- Optional git hooks for code quality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Anuar Ibrayev](https://github.com/Anuarder)

## Support

If you encounter any issues or have questions:
- 🐛 [Report a bug](https://github.com/Anuarder/create-react-fsd-app/issues)
- 💡 [Request a feature](https://github.com/Anuarder/create-react-fsd-app/issues)
- 📧 Contact: anuarder.dev@gmail.com

