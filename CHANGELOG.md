# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-01-06

> **[View Release on GitHub](https://github.com/Anuarder/create-react-fsd-app/releases/tag/v1.0.1)**

### 📚 Documentation

#### Changed
- 📝 Enhanced CHANGELOG.md with comprehensive release notes
  - Added detailed feature descriptions with emojis for better readability
  - Organized content into clear categories (CLI, Architecture, Technology Stack, etc.)
  - Included version information for all dependencies
  - Added security and best practices section
- 📖 Improved README.md documentation
  - Better formatting and structure
  - Clearer usage instructions
  - Enhanced project structure explanations
- 🔗 Added direct GitHub release links to CHANGELOG

#### Fixed
- 📋 Corrected local testing instructions in documentation
- 🔧 Updated publishing guide with accurate npm link usage

## [1.0.0] - 2026-01-06

> **[View Release on GitHub](https://github.com/Anuarder/create-react-fsd-app/releases/tag/1.0.0)**

### 🎉 Initial Release

The first stable release of `create-react-fsd-app` - a modern CLI tool for scaffolding React applications with Feature-Sliced Design architecture.

### ✨ Core Features

#### CLI & Project Setup
- 🚀 Interactive CLI with intelligent prompts
- 📝 Project name validation and sanitization
- ⚡ Fast project scaffolding with optimized file generation
- 🎯 Zero-config setup - works out of the box

#### Architecture & Structure
- 🏗️ **Feature-Sliced Design (FSD)** methodology implementation
- 📁 Pre-configured project structure:
  - `app/` - Application initialization and providers
  - `entities/` - Business entities and domain logic
  - `modules/` - Feature modules and business features
  - `shared/` - Reusable utilities, components, and configurations
- 🔗 Smart path aliases for clean imports:
  - `~` → `src/`
  - `~app` → `src/app/`
  - `~shared` → `src/shared/`
  - `~entities` → `src/entities/`
  - `~modules` → `src/modules/`

#### Technology Stack

**Core Framework & Language**
- ⚛️ **React 19** - Latest React with concurrent features
- 📘 **TypeScript 5.7** - Strict type checking enabled
- ⚡ **Vite 6** - Lightning-fast build tool and dev server

**Styling**
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📱 Responsive design utilities
- 🎭 Custom configuration with design tokens

**State Management**
- 🔄 **TanStack Query 5** - Server state management
  - React Query DevTools included
  - Optimistic updates configuration
  - Cache management setup
- 🐻 **Zustand 5** - Ready-to-use client state management
  - Minimal boilerplate
  - TypeScript-first approach

**Routing**
- 🛣️ **React Router 7** - Type-safe routing
  - Lazy loading support
  - Nested routes configuration
  - Route-based code splitting

**Testing**
- 🧪 **Vitest 2** - Fast unit testing framework
  - React Testing Library integration
  - Coverage reporting configured
  - Watch mode enabled
  - DOM environment setup

**Code Quality & Formatting**
- 🔍 **ESLint 9** - Comprehensive linting rules
  - Flat config format (modern ESLint)
  - React hooks rules
  - TypeScript-specific rules
  - Import/export validation
  - Accessibility checks
- 💅 **Prettier 3** - Opinionated code formatting
  - Automatic import sorting
  - Consistent code style
  - Integration with ESLint

**Git Workflow (Optional)**
- 🪝 Git hooks with multiple validation layers:
  - **Commit message validation** - Conventional commits format
  - **Pre-commit linting** - Automatic code quality checks
  - **Branch naming enforcement** - Consistent branch conventions
  - Easy opt-in during project creation

### 📚 Documentation & Developer Experience

- 📖 **Comprehensive README** with:
  - Quick start guide
  - Available scripts documentation
  - Project structure explanation
  - Development workflow
  - Deployment guidelines
- 🤖 **CLAUDE.md** - AI-friendly coding standards:
  - Architecture principles
  - Coding conventions
  - Best practices
  - FSD methodology guidelines
- 🔐 **Environment variables** setup:
  - `.env.example` template
  - `.env` for local development
  - Type-safe environment access via `shared/config`

### ⚙️ Configuration Files

- 📝 **TypeScript** - Three-tier configuration:
  - `tsconfig.json` - Base configuration
  - `tsconfig.app.json` - Application code
  - `tsconfig.node.json` - Build tools
- ⚡ **Vite** - Optimized for development and production
- 🎨 **Tailwind** - Custom configuration with content paths
- 🧪 **Vitest** - Test environment and globals setup
- 📦 **npm** - `.npmrc` with optimal settings

### 🔒 Security & Best Practices

- ✅ Strict TypeScript mode enabled
- ✅ ESLint security rules
- ✅ `.gitignore` with comprehensive exclusions
- ✅ Environment variables properly configured
- ✅ No hardcoded secrets or sensitive data
- ✅ Modern ESM modules (no CommonJS)

### 📦 Package Information

- **Package Name**: `create-react-fsd-app`
- **Usage**: `npm create react-fsd-app@latest`
- **Node Version**: >=20.10.0
- **License**: MIT
- **Repository**: [github.com/Anuarder/create-react-fsd-app](https://github.com/Anuarder/create-react-fsd-app)

[Unreleased]: https://github.com/Anuarder/create-react-fsd-app/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/Anuarder/create-react-fsd-app/releases/tag/v1.0.1
[1.0.0]: https://github.com/Anuarder/create-react-fsd-app/releases/tag/v1.0.0

