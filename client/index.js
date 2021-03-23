import React from 'react';
import { render } from 'react-dom'; 
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