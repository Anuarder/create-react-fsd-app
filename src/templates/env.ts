export function generateEnvFile(): string {
  return `VITE_APP_RUNTIME_MODE=development
VITE_APP_API_URL=http://localhost:3000
`;
}

export function generateEnvTemplate(): string {
  return `# Runtime mode (development, production)
VITE_APP_RUNTIME_MODE=development

# API URL
VITE_APP_API_URL=http://localhost:3000
`;
}

