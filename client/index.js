import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx';
import { render } from 'react-dom'; 
import NavbarLogin from './components/NavbarLogin.jsx';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http:localhost:8080',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <NavbarLogin />
  </ApolloProvider>,
 document.getElementById("mainBody"),
);