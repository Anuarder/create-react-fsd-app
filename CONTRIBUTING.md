# Contributing to create-react-fsd-app

Thank you for your interest in contributing to create-react-fsd-app! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js >= 20.10.0
- Bun (recommended) or npm
- Git

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/Anuarder/create-react-fsd-app.git
   cd create-react-fsd-app
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the CLI in Development

```bash
# Run the CLI directly
bun run dev

# Or build and test
bun run build
./dist/index.js
```

### Testing Your Changes Locally

Before submitting a PR, test your changes:

```bash
# Build the package
bun run build

# Link it globally
npm link

# Test in a temporary directory
cd /tmp
npm create react-fsd-app@latest
cd my-test-app
npm install
npm run dev
```

### Project Structure

```
create-react-fsd-app/
├── src/
│   ├── index.ts              # Main CLI entry point
│   └── templates/            # Template generators
│       ├── package-json.ts   # Package.json template
│       ├── vite-config.ts    # Vite config template
│       ├── react/            # React-specific templates
│       └── shared/           # Shared templates
├── dist/                     # Compiled output (gitignored)
├── package.json
└── tsconfig.json
```

## Making Changes

### Adding a New Template

1. Create a new file in `src/templates/`:
   ```typescript
   export function generateYourTemplate(): string {
     return `
   // Your template content
   `;
   }
   ```

2. Import and use it in `src/index.ts`:
   ```typescript
   import { generateYourTemplate } from './templates/your-template';
   
   // In generateFiles function:
   await writeFile(
     join(projectDir, 'path/to/file'),
     generateYourTemplate()
   );
   ```

### Modifying Existing Templates

1. Locate the template file in `src/templates/`
2. Make your changes
3. Test the generated output
4. Update documentation if needed

### Adding New CLI Options

1. Add the prompt in `src/index.ts`:
   ```typescript
   {
     type: 'confirm',
     name: 'yourOption',
     message: 'Your question?',
     initial: false,
   }
   ```

2. Add to `ProjectConfig` interface:
   ```typescript
   interface ProjectConfig {
     // ... existing fields
     yourOption: boolean;
   }
   ```

3. Use the option in `generateFiles` or `createProject` functions

## Code Style

- Use TypeScript with strict mode
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Commit Guidelines

We follow conventional commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(templates): add support for custom CSS preprocessors
fix(cli): resolve path alias issue on Windows
docs(readme): update installation instructions
refactor(templates): simplify vite config generation
```

## Pull Request Process

1. **Update documentation**: If you've added features, update the README.md
2. **Test thoroughly**: Ensure your changes work on different platforms
3. **Keep commits clean**: Squash unnecessary commits
4. **Write clear PR description**: Explain what and why
5. **Link issues**: Reference any related issues

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested locally
- [ ] Documentation has been updated
- [ ] Commit messages follow the conventional format
- [ ] No breaking changes (or clearly documented)
- [ ] Generated projects work correctly

## Testing

### Manual Testing Checklist

When testing your changes, verify:

- [ ] CLI prompts work correctly
- [ ] All files are generated
- [ ] Generated project structure is correct
- [ ] `npm install` works in generated project
- [ ] `npm run dev` starts the dev server
- [ ] `npm run build` builds successfully
- [ ] `npm run lint` passes
- [ ] `npm run test` runs tests
- [ ] Git hooks work (if enabled)
- [ ] Path aliases resolve correctly

### Test on Multiple Platforms

If possible, test on:
- macOS
- Linux
- Windows

## Reporting Issues

### Bug Reports

Include:
- Node.js version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages or screenshots

### Feature Requests

Include:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Examples from other tools (if applicable)

## Questions?

If you have questions:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out via email: anuarder.dev@gmail.com

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to create-react-fsd-app! 🎉

