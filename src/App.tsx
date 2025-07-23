import './App.css';
import { Home, Description, About } from './components';
import { Route, Routes } from 'react-router';


const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path=":index" element={<Description/>}/>
        </Route>
        <Route path='/about' element={<About/>} />
      </Routes>
    );
}

export default App;
