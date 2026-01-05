export function generateTsConfig(): string {
  return JSON.stringify(
    {
      files: [],
      references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
    },
    null,
    2
  );
}

