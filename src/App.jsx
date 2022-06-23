/* Librerias */
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

/* Components */
import Layout from './layouts/Layout';
import Desarrollo from './pages/desarrollo/desarrolloFront';
import Github from './pages/github';
import PythonExploring from './pages/python';
import PythonFiltering from './pages/python/pythonFiltering';


/* Styles */
import './styles/tabla.css'
import './styles/style.css'
import './styles/navbar.css'

import { UserContext } from './context/userContext';

const httpLink = createHttpLink({
  uri: 'https://codigos-back.herokuapp.com/graphql',
});


/* 
  uri:'http://localhost:4000/graphql'
      'https://codigos-back.herokuapp.com/graphql'
  
*/


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('contraseña');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
 
}) 


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
