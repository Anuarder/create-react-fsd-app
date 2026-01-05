export function generateProvidersIndex(): string {
  return `export { RoutesProvider } from './routes';
export { TanstackQueryProvider } from './tanstack-query';
`;
}

