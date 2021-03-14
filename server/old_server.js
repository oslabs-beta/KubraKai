if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
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
const bcrypt = require('bcrypt')
const initializePassport = require('../passport-config');
const { useScrollTrigger } = require('@material-ui/core');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session')
const methodOverride = require('method-override')
const db = require('../models/userModel');

//pg connection
// const {Pool} = require('pg')
// const PG_URI = 'postgres://omfrgiuo:ybRG4dCelKJOxOig-4Y1NL64EewpdrHY@ziggy.db.elephantsql.com:5432/omfrgiuo'
// const pool = new Pool({
//     connectionString: PG_URI
//   });

///// testing sequelize db connection

// const { Sequelize } = require('sequelize');

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://omfrgiuo:ybRG4dCelKJOxOig-4Y1NL64EewpdrHY@ziggy.db.elephantsql.com:5432/omfrgiuo') // Example for postgres
// const connectTest = async ()=>{
//   try {
//     await sequelize.authenticate();
//     console.log('-------------------DATABASE Connection has been established successfully.------------------------------------------------');
//   } catch (error) {
//     console.error('----------------------Unable to connect to the database:---------------------------', error);
//   }
// }
// connectTest()

//////
  // pool.query("CREATE TABLE accounts (user_id serial PRIMARY KEY, username VARCHAR ( 50 ) UNIQUE NOT NULL, password VARCHAR ( 50 ) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP);")
  //  .then((data)=>{console.log(data)})
  // pool.query("DROP TABLE accounts;")
  //  .then((data)=>{rconsole.log(data)})
  
  // const { Sequelize } = require('sequelize');
  
  // Option 1: Passing a connection URI
  // const sequelize = new Sequelize('postgres://psnlykfs:BJc1JgNzXl1elMMu1eYlVEXh5KbLJjSp@ziggy.db.elephantsql.com:5432/psnlykfs') // Example for postgres
  
  // try {
    //   await sequelize.authenticate();
    //   console.log('Connection has been established successfully.');
    // } catch (error) {
      //   console.error('Unable to connect to the database:', error);
      // }
      /**
       * handle parsing request body
       */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view-engine','ejs')
app.use(bodyParser.json());
app.use('*', cors());
app.use(methodOverride('_method'))
const fakeDbContent = [
  // {
  //      id: '1615333456941',
  //      name: 'have you signed in yet?',
  //      email: 'danny@danny',
  //     password: '$2b$10$pytqCljQESdRtgJ4hZocNecaAmRUG/C0H2rsDjFZrUd79X.3tv88G'//danny
  //   },
  ]
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(flash());
const server = new ApolloServer({ 
    introspection: true, 
    playground: true,
    resolvers, 
    typeDefs });

server.applyMiddleware({ app });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    })
    );


initializePassport(
  passport,
  email => fakeDbContent.find(user => user.email === email),
  id => fakeDbContent.find(user => user.id === id)
)

//intializes passport for all requests
app.use(passport.initialize())

app.use(passport.session())



app.get("/", 
checkAuthenticated, 
(req, res) => {
  console.log(req.session)
  req.session.viewCount +=1
  console.log('youve been here: ',req.session.viewCount)
  // res.render('index.ejs',{name:req.user.name})
  res.sendFile(path.resolve(__dirname, "../index.html"));
});



app.get('/login',checkNotAuthenticated, (req,res)=>{
  res.render('login.ejs')
})
app.post('/login',checkNotAuthenticated, passport.authenticate('local',{
  successRedirect:'/',// successful redirect sends here!!!
  failureRedirect:'/login',
  failureFlash: true
}))
app.get('/register',checkNotAuthenticated, (req,res)=>{
  res.render('register.ejs')
})
app.post('/register', checkNotAuthenticated, async (req,res)=>{
 try{
 const hashPassword = await bcrypt.hash(req.body.password, 10)
 fakeDbContent.push({
   id: Date.now().toString(),
   name:req.body.name,
   email: req.body.email,
   password:hashPassword
 })
 res.redirect('/login') 
 } catch {
   console.log('catch') 
res.redirect('/register')
 } 
 console.log(fakeDbContent)
})



// app.use((req, res) => {
//   res.status(200);
//   res.send('Hello!');
//   res.end();
// });
// handle logout
app.delete('/logout', (req, res) => {
  req.logOut()
  console.log('logged out now....')
  res.redirect('/login')
})
// check to see if a user is authenticated
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
 res.redirect('/login')
}
// check to see if a user is NOT authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { //passport feature
    return res.redirect('/')
  }
  next()
}


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)