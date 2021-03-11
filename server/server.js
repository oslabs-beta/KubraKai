const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors'); 
const path = require('path')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers')
const bodyParser = require('body-parser')
const mongoSchema = require('./schemas/metricsModel.js')
const app = express();
const url = "mongodb+srv://KubraKai:codesmith@cluster0.btqz2.mongodb.net/kubrakai?retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});
app.use(bodyParser.json());
app.use('*', cors());

//Jordan added this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use('/client', express.static(path.resolve(__dirname, '../client')));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

const server = new ApolloServer({ 
  introspection: true, 
  playground: true,
  resolvers, 
  typeDefs });

// const mongoServer = new ApolloServer({
//   interospection: true,
//   playgroud: true,
//   typeDefs: mongoSchema,
//   resolvers
// })

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)