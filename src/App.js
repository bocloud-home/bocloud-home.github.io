import React from 'react';
import { useState } from "react";
import './App.css';
import NavBar from './components/NavBar';
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Storage from './pages/Storage';
import Calendar from './pages/Calendar';
import Recipe from './pages/Recipe';
import EditRecipe from './pages/EditRecipe';

function App() {
const [open, setOpen] = useState(true);
return (
    <Router>
      <NavBar open={setOpen}/>
      <div className={`main ${open}`}>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/recipes' element={<Recipes/>} />
          <Route path='/recipe/:id' element={<Recipe/>} />
          <Route path='/recipe/create' element={<EditRecipe/>}/>
          <Route path='/recipe/edit/:id' element={<EditRecipe/>}/>
          <Route path='/storage' element={<Storage/>} />
          <Route path='/calendar' element={<Calendar/>} />
      </Routes>
      </div>
    </Router>
);
}

export default App;
