import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Storage from './pages/Storage';
import Calendar from './pages/Calendar';
import Recipe from './pages/Recipe';

function App() {
return (
    <Router>
      <NavBar />
      <div className="main">
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/recipes' element={<Recipes/>} />
          <Route path='/recipe/:id' element={<Recipe/>} />
          <Route path='/storage' element={<Storage/>} />
          <Route path='/calendar' element={<Calendar/>} />
      </Routes>
      </div>
    </Router>
);
}

export default App;
