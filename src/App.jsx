/* Librerias */
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";


/* Components */
import Layout from './layouts/Layout';
import Desarrollo from './pages/desarrollo/desarrollo';
import Github from './pages/github/github';
import Proyectos from './pages/proyectos/proyectos';
import PythonExploring from './pages/python/pythonExploring';
import PythonFiltering from './pages/python/pythonFiltering';
import PythonTimeSeries from './pages/python/pythonTimeSeries';

/* Styles */
import './styles/tabla.css'
import './styles/style.css'


/* const client= new ApolloClient({
  uri:'https://innova1.herokuapp.com/graphql',
  cache:new InMemoryCache(),
});  */

const client= new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache(),
});  




function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Layout />}>
            <Route path='/python/exploring' element={<PythonExploring/>} />
            <Route path='/python/filtering' element={<PythonFiltering/>} />
            <Route path='/python/timeSeries' element={<PythonTimeSeries/>} />
            <Route path='/desarrollo' element={<Desarrollo/>} />
            <Route path='/github' element={<Github/>} />
            <Route path='/proyectos' element={<Proyectos/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
