export function generateViteConfig(): string {
  return `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const ROOT_DIR = \`\${__dirname}/src/app\`;
const BUILD_OUT_DIR = \`\${__dirname}/dist\`;

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  const isDev = mode === 'development';

  return {
    envDir: __dirname,
    publicDir: \`\${__dirname}/public\`,
    define: {
      global: {},
      __DEV__: isDev,
    },
    root: ROOT_DIR,
    build: {
      outDir: BUILD_OUT_DIR,
      emptyOutDir: true,
      sourcemap: isDev,
      minify: !isDev ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
        },
      },
    },
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '~app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '~shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '~entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        '~modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
  };
});
`;
}

