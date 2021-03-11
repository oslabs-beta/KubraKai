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
//sql db
const pg = require('pg')
const clientClass = pg.Client
const pgUrl = 'postgres://psnlykfs:BJc1JgNzXl1elMMu1eYlVEXh5KbLJjSp@ziggy.db.elephantsql.com:5432/psnlykfs'
const db = new clientClass(pgUrl)
// import * as jwt from 'jsonwebtoken'
// import * as jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt')
const session = require('express-session');
const { prisma } = require('@prisma/client');

app.use(bodyParser.json());
app.use('*', cors());

const fakeUsers = []
//Jordan added this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

//express session
app.use(session({
secret: 'secret-key',
resave:false,
saveUninitialized:false,
})
);
app.set('view-engine','ejs')
app.get("/", (req, res) => {
  // res.json(users)
  req.session.viewCount +=1
  console.log('youve been here: ',req.session.viewCount)
  res.render('index.ejs',{name:'Danny'})
  // res.sendFile(path.resolve(__dirname, "../index.html"));
}); 
app.get('/login',(req,res)=>{
  res.render('login.ejs')
})
app.get('/register',(req,res)=>{
  res.render('register.ejs')
})
app.post('/register', async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    fakeUsers.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
    
  } catch{
    res.redirect('/register')
  }
  console.log(fakeUsers)
})

const server = new ApolloServer({ 
  introspection: true, 
  playground: true,
  resolvers, 
  typeDefs });

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
