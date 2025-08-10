import { About, Description, NotFound } from '@/components';
import { Home } from '@/pages/home/home';

export const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/:name',
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
