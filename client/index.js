import React from 'react';
import { render } from 'react-dom'; 
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import App from './containers/App'

/* 
 * TODO: Currenlty, the ApolloClient is not used.
 *       To use, deploy graphql_service and query at port:9000
 *       Once connected, queries that go directly to the Prometheus
 *       server must be replaced with graphql queries.  This
 *       will provide a layer of abstraction that removes the need to 
 *       write PromQL queries from the front end
  */
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/',
  cache: new InMemoryCache()
});
render(
  <ApolloProvider client={client}>
    <App/>

  </ApolloProvider>,
 document.getElementById("mainBody")
);