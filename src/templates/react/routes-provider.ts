export function generateRoutesProvider(): string {
  return `import type { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Welcome to your app!</div>,
  },
  // Add more routes here, for example:
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  //   loader: aboutLoader,
  // },
  // {
  //   path: '/users/:id',
  //   element: <UserPage />,
  //   loader: userLoader,
  //   action: userAction,
  // },
]);

function RoutesProvider(): ReactElement {
  return <RouterProvider router={router} />;
}

export { RoutesProvider };
`;
}

