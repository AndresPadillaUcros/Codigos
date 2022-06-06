/* Librerias */
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";


/* Components */
import Layout from './layouts/Layout';
import Desarrollo from './pages/desarrollo/desarrolloFront';
import Github from './pages/github';
import PythonExploring from './pages/python';
import PythonFiltering from './pages/python/pythonFiltering';


/* Styles */
import './styles/tabla.css'
import './styles/style.css'

import { UserContext } from './context/userContext';

const client= new ApolloClient({
  uri:'https://codigos-back.herokuapp.com/graphql',
  cache:new InMemoryCache(),
}); 

/* const client= new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache(),
});   */




function App() {

  const [userData, setUserData] = useState({});
  
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element ={<Layout />}>
              <Route path="/" element={<Navigate replace to="/python" />} />
              <Route path='/python' element={<PythonExploring/>} /> 
              <Route path='/python/filtering' element={<PythonFiltering/>} />
              <Route path='/desarrollo' element={<Desarrollo/>} />
              <Route path='/github' element={<Github/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
