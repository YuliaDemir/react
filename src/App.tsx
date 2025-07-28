import { useRoutes } from 'react-router';
import { routes } from './routes';

const App = () => {
  const paths = useRoutes(routes);
  return paths;
};

export default App;
