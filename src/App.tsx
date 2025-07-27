import { Home, Description, About } from './components';
import { Route, Routes } from 'react-router';
import { NotFound } from './components/404';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/:index" element={<Description />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
