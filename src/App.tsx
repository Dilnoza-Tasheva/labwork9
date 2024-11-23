import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import Categories from './containers/Categories/Categories.tsx';


const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/add" element={<Home/>}/>
          <Route path="*" element={<h3>Not found</h3>}/>
        </Routes>
      </main>

    </>
  );
};

export default App;
