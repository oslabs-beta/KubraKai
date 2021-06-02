import React from 'react';
import { render } from 'react-dom'; 
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import Account from './containers/Account'
/* Authors: Jordan Kind,  Taylor Davis
 * Index JS file to import our Apollo Server for GraphQL API. 
 * Apollo Client allows us to wrap our application in a Provider.
 * The provider allows us to use GraphQL in our App. 
  */
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