export function generateSharedConfig(): { index: string; env: string } {
  return {
    index: `export { env } from './env';
`,
    env: `const RUNTIME_MODE = import.meta.env.VITE_APP_RUNTIME_MODE;

export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL as string,
  IS_PROD_RUNTIME: RUNTIME_MODE === 'production',
  IS_DEV_RUNTIME: RUNTIME_MODE === 'development',
};
`,
  };
}

