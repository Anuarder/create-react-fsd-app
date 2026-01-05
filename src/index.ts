#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import prompts from 'prompts';

import { generateClaudeRules } from './templates/claude-rules';
import { generateEnvFile, generateEnvTemplate } from './templates/env';
import { generateEslintConfig } from './templates/eslint-config';
import {
  generateCommitMsgHook,
  generatePostCheckoutHook,
  generatePostCheckoutHookWithoutBranchNaming,
  generatePreCommitHook,
  generateFrontendLintScript,
} from './templates/git-hooks';
import { generateGitignore } from './templates/gitignore';
import { generateIndexHtml } from './templates/index-html';
import { generateNpmrc } from './templates/npmrc';
import { generatePackageJson } from './templates/package-json';
import { generatePrettierConfig } from './templates/prettier-config';
import { generateAppIndex } from './templates/react/app-index';
import { generateProvidersIndex } from './templates/react/providers-index';
import { generateRoutesProvider } from './templates/react/routes-provider';
import { generateTanstackQueryProvider } from './templates/react/tanstack-query-provider';
import { generateSharedConfig } from './templates/shared/config';
import { generateSharedIndex } from './templates/shared/shared-index';
import { generateStylesCss } from './templates/styles-css';
import { generateTailwindConfig } from './templates/tailwind-config';
import { generateTsConfigApp } from './templates/tsconfig-app';
import { generateTsConfigNode } from './templates/tsconfig-node';
import { generateTsConfig } from './templates/tsconfig';
import { generateViteConfig } from './templates/vite-config';
import { generateVitestConfig } from './templates/vitest-config';

interface ProjectConfig {
  projectName: string;
  useGitHooks: boolean;
  useBranchNaming: boolean;
  ticketPrefix?: string;
}

async function main(): Promise<void> {
  console.log('🚀 Welcome to create-react-fsd-app!\n');
  console.log('This CLI will help you scaffold a Feature-Sliced Design React application.\n');

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-app',
      validate: (value: string) =>
        value.length > 0 && /^[a-z0-9-]+$/.test(value)
          ? true
          : 'Project name must be lowercase with hyphens only',
    },
    {
      type: 'confirm',
      name: 'useGitHooks',
      message: 'Create git hooks?',
      initial: true,
    },
    {
      type: (prev: boolean) => (prev ? 'confirm' : null),
      name: 'useBranchNaming',
      message: 'Do you want to enforce branch naming rules?',
      initial: false,
    },
    {
      type: (_prev: boolean, values: { useBranchNaming?: boolean }) =>
        values.useBranchNaming ? 'text' : null,
      name: 'ticketPrefix',
      message: 'What is your ticket prefix? (e.g., "kan" for kan-123)',
      initial: 'ticket',
      validate: (value: string) =>
        value.length > 0 && /^[a-z]+$/.test(value)
          ? true
          : 'Ticket prefix must be lowercase letters only',
    },
  ]);

  if (!response.projectName) {
    console.log('\n❌ Project creation cancelled');
    process.exit(0);
  }

  const config: ProjectConfig = {
    projectName: response.projectName,
    useGitHooks: response.useGitHooks || false,
    useBranchNaming: response.useBranchNaming || false,
    ticketPrefix: response.ticketPrefix,
  };

  console.log(`\n📦 Creating project: ${config.projectName}...`);

  await createProject(config);

  console.log('\n✅ Project created successfully!\n');
  console.log('📝 Next steps:\n');
  console.log(`  cd ${config.projectName}`);
  console.log('  npm install');
  console.log('  npm run dev\n');

  if (config.useGitHooks) {
    console.log('🪝 Git hooks have been set up. To activate them:\n');
    console.log('  git init');
    console.log('  chmod +x git-hooks/*');
    console.log('  chmod +x git-hooks/utils/*');
    console.log('  git config core.hooksPath git-hooks\n');

    if (config.useBranchNaming && config.ticketPrefix) {
      console.log(`📋 Branch naming convention: <type>/${config.ticketPrefix}-<number>`);
      console.log(`   Example: feature/${config.ticketPrefix}-123\n`);
    }
  }

  console.log('Happy coding! 🎉\n');
}

async function createProject(config: ProjectConfig): Promise<void> {
  const projectDir = join(process.cwd(), config.projectName);

  // Create directory structure
  await createDirectoryStructure(projectDir);

  // Generate all files
  await generateFiles(projectDir, config);

  console.log('✅ All files generated');
}

async function createDirectoryStructure(projectDir: string): Promise<void> {
  const dirs = [
    // Project root
    projectDir,
    join(projectDir, 'public'),
    join(projectDir, 'src'),
    join(projectDir, 'src/app'),
    join(projectDir, 'src/app/css'),
    join(projectDir, 'src/app/providers'),
    join(projectDir, 'src/app/providers/routes'),
    join(projectDir, 'src/app/providers/tanstack-query'),
    join(projectDir, 'src/entities'),
    join(projectDir, 'src/modules'),
    join(projectDir, 'src/shared'),
    join(projectDir, 'src/shared/api'),
    join(projectDir, 'src/shared/assets'),
    join(projectDir, 'src/shared/config'),
    join(projectDir, 'src/shared/lib'),
    join(projectDir, 'src/shared/ui'),
  ];

  for (const dir of dirs) {
    await mkdir(dir, { recursive: true });
  }

  console.log('✅ Directory structure created');
}

async function generateFiles(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  // Root level files
  await writeFile(join(projectDir, 'CLAUDE.md'), generateClaudeRules(config.projectName));
  await writeFile(join(projectDir, '.gitignore'), generateGitignore());

  // Package.json and configs
  await writeFile(join(projectDir, 'package.json'), generatePackageJson(config.projectName));
  await writeFile(join(projectDir, '.npmrc'), generateNpmrc());
  await writeFile(join(projectDir, '.prettierrc'), generatePrettierConfig());
  await writeFile(join(projectDir, 'eslint.config.js'), generateEslintConfig());
  await writeFile(join(projectDir, 'tsconfig.json'), generateTsConfig());
  await writeFile(join(projectDir, 'tsconfig.app.json'), generateTsConfigApp());
  await writeFile(join(projectDir, 'tsconfig.node.json'), generateTsConfigNode());
  await writeFile(join(projectDir, 'vite.config.ts'), generateViteConfig());
  await writeFile(join(projectDir, 'vitest.config.ts'), generateVitestConfig());
  await writeFile(join(projectDir, 'tailwind.config.ts'), generateTailwindConfig());
  await writeFile(join(projectDir, '.env'), generateEnvFile());
  await writeFile(join(projectDir, '.env.example'), generateEnvTemplate());

  // App files
  await writeFile(join(projectDir, 'src/app/index.html'), generateIndexHtml(config.projectName));
  await writeFile(join(projectDir, 'src/app/index.tsx'), generateAppIndex());
  await writeFile(join(projectDir, 'src/app/css/styles.css'), generateStylesCss());

  // Providers
  await writeFile(join(projectDir, 'src/app/providers/index.ts'), generateProvidersIndex());
  await writeFile(
    join(projectDir, 'src/app/providers/routes/index.tsx'),
    generateRoutesProvider()
  );
  await writeFile(
    join(projectDir, 'src/app/providers/tanstack-query/index.tsx'),
    generateTanstackQueryProvider()
  );

  // Shared
  await writeFile(join(projectDir, 'src/shared/index.ts'), generateSharedIndex());
  await writeFile(join(projectDir, 'src/shared/config/index.ts'), generateSharedConfig().index);
  await writeFile(join(projectDir, 'src/shared/config/env.ts'), generateSharedConfig().env);

  // Placeholder files
  await writeFile(join(projectDir, 'src/shared/api/.gitkeep'), '');
  await writeFile(join(projectDir, 'src/shared/assets/.gitkeep'), '');
  await writeFile(join(projectDir, 'src/shared/lib/.gitkeep'), '');
  await writeFile(join(projectDir, 'src/shared/ui/.gitkeep'), '');
  await writeFile(join(projectDir, 'src/entities/.gitkeep'), '');

  // Modules with README
  await writeFile(
    join(projectDir, 'src/modules/README.md'),
    `# Modules

This directory contains feature modules following Feature-Sliced Design architecture.

## Structure

Each module should contain:
- \`features/\` - User-facing features and scenarios
- \`pages/\` - Page components for routing
- \`entities/\` - Module-specific business entities (optional)

## Example Module Structure

\`\`\`
modules/
└── auth/
    ├── features/
    │   └── sign-in/
    │       ├── ui/
    │       │   └── SignInForm.tsx
    │       └── index.ts
    ├── pages/
    │   └── sign-in/
    │       ├── ui/
    │       │   └── SignInPage.tsx
    │       └── index.ts
    └── index.ts
\`\`\`

## Guidelines

- Keep modules independent and self-contained
- Export public API through index.ts files
- Follow kebab-case for folder names
- Follow PascalCase for React component files
`
  );

  await writeFile(join(projectDir, 'src/vite-env.d.ts'), `/// <reference types="vite/client" />
`);

  // Public files
  await writeFile(
    join(projectDir, 'public/vite.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>`
  );

  // Git hooks (if enabled)
  if (config.useGitHooks) {
    const gitHooksDir = join(projectDir, 'git-hooks');
    const utilsDir = join(gitHooksDir, 'utils');

    await mkdir(gitHooksDir, { recursive: true });
    await mkdir(utilsDir, { recursive: true });

    await writeFile(join(gitHooksDir, 'commit-msg'), generateCommitMsgHook());
    await writeFile(join(gitHooksDir, 'pre-commit'), generatePreCommitHook());

    // Generate post-checkout hook based on branch naming preference
    if (config.useBranchNaming && config.ticketPrefix) {
      await writeFile(
        join(gitHooksDir, 'post-checkout'),
        generatePostCheckoutHook(config.ticketPrefix)
      );
    } else {
      await writeFile(
        join(gitHooksDir, 'post-checkout'),
        generatePostCheckoutHookWithoutBranchNaming()
      );
    }

    await writeFile(join(utilsDir, 'lint.sh'), generateFrontendLintScript());

    // Generate README based on configuration
    let readmeContent = `# Git Hooks

This directory contains git hooks for the project.

## Setup

To activate the git hooks:

\`\`\`bash
git config core.hooksPath git-hooks
chmod +x git-hooks/*
chmod +x git-hooks/utils/*
\`\`\`

## Available Hooks

- \`commit-msg\` - Validates commit message length (3-100 characters)
- \`pre-commit\` - Runs linting and formatting on staged files
- \`post-checkout\` - ${config.useBranchNaming && config.ticketPrefix ? 'Validates branch naming convention' : 'Placeholder for future extensions'}
`;

    if (config.useBranchNaming && config.ticketPrefix) {
      readmeContent += `
## Branch Naming Convention

Format: \`<type>/${config.ticketPrefix}-<number>\`

Allowed types:
- feature (or feat)
- fix (or hotfix or bugfix)
- maintenance
- infra
- epic

Examples:
- ✅ \`feature/${config.ticketPrefix}-123\`
- ✅ \`fix/${config.ticketPrefix}-456\`
- ❌ \`my-feature\` (invalid)
`;
    }

    await writeFile(join(gitHooksDir, 'README.md'), readmeContent);
  }
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

