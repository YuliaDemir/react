import { useRoutes } from 'react-router';

import { routes } from './shared/routes.tsx';

const App = () => {
  const paths = useRoutes(routes);
  return paths;
};

export default App;
