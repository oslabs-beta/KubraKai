import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx';
import { render } from 'react-dom'; 
import NavbarLogin from './components/NavbarLogin.jsx';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Account from './containers/Account'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/',
  cache: new InMemoryCache()
});


render(
  <ApolloProvider client={client}>
    <Account />
  </ApolloProvider>,
 document.getElementById("mainBody")
);