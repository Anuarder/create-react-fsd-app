export function generateTailwindConfig(): string {
  return `import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
} satisfies Config;
`;
}

