import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layouts/Layout';
import Desarrollo from './pages/desarrollo/desarrollo';
import Github from './pages/github/github';
import Proyectos from './pages/proyectos/proyectos';
import Python from './pages/python/python';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Layout />}>
          <Route path='/python' element={<Python/>} />
          <Route path='/desarrollo' element={<Desarrollo/>} />
          <Route path='/github' element={<Github/>} />
          <Route path='/proyectos' element={<Proyectos/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
