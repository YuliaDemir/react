import { About, Description, Home, NotFound } from './components';

export const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/:index',
        element: <Description />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
