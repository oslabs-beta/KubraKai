const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const PrometheusAPI = require('./dataSource');

const PORT = 9000;

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  dataSources: ()=>{
    return{
      prometheusAPI: new PrometheusAPI()
    } 
  }
})

const app = express();
server.applyMiddleware({app});

app.listen(PORT, console.log("listening on port: ", PORT));

