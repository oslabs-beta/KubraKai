if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express');

const cors = require('cors'); 
const path = require('path')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers')
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt')
// const initializePassport = require('../passport-config');
// const flash = require('express-flash');
// const passport = require('passport');
const session = require('express-session')
const methodOverride = require('method-override')
const { PrismaClient } = require('@prisma/client')
// const redis = require("redis");
// const redisStore = require('connect-redis')(session);
// const redisClient = redis.createClient();
const prisma = new PrismaClient;


// initializePassport(
//   passport,
//   email => {prisma.users.findUnique({
//     where: {
//       email
//     }
//   })
// }, //finds users email in db
//   id => {prisma.users.findUnique({
//     where: {
//       id
//     }
//   })
// });  
// initializePassport(
//   passport,
//   email => fakeDbContent.find(user => user.email === email),
//   id => fakeDbContent.find(user => user.id === id)
// )

app.set('view-engine','ejs')

app.use(bodyParser.json());
app.use('*', cors());
// const fakeDbContent = [
//   // {
//   //      id: '1615333456941',
//   //      name: 'have you signed in yet?',
//   //      email: 'danny@danny',
//   //     password: '$2b$10$pytqCljQESdRtgJ4hZocNecaAmRUG/C0H2rsDjFZrUd79X.3tv88G'//danny
//   //   },
//   ]
// //Jordan added this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));
// app.use(flash());
app.use(session({
  secret: 'super secret',
  resave:false,
  saveUninitialized:false,
  })
  );
//intializes passport for all requests
// app.use(passport.initialize())

// app.use(passport.session())
// app.use(methodOverride('_method'))



app.get("/", 
// checkAuthenticated, 
(req, res) => {
  console.log(req.session)
  // req.session.viewCount +=1
  // console.log('youve been here: ',req.session.viewCount)
  // res.render('index.ejs',{name:req.user.name})
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

// app.get('/login',checkNotAuthenticated, (req,res)=>{
//   res.render('login.ejs')
// })
// app.post('/login',checkNotAuthenticated, passport.authenticate('local',{
//   successRedirect:'/',// successful redirect sends here!!!
//   failureRedirect:'/login',
//   failureFlash: true
// }))
// app.get('/register',checkNotAuthenticated, (req,res)=>{
//   res.render('register.ejs')
// })
// app.post('/register', checkNotAuthenticated, async (req,res)=>{
//  try{
//  const hashPassword = await bcrypt.hash(req.body.password, 10)
//  fakeDbContent.push({
//    id: Date.now().toString(),
//    name:req.body.name,
//    email: req.body.email,
//    password:hashPassword
//  })
//  res.redirect('/login') 
//  } catch {
//    console.log('catch') 
// res.redirect('/register')
//  } 
//  console.log(fakeDbContent)
// })

const server = new ApolloServer({ 
  introspection: true, 
  playground: true,
  resolvers, 
  typeDefs });

server.applyMiddleware({ app });

// app.delete('/logout', (req, res) => {
//   req.logOut()
//   console.log('logged out now....')
//   res.redirect('/login')
// })

// function checkAuthenticated(req,res,next){
//   if (req.isAuthenticated()){
//     return next()
//   }
//  res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { //passport feature
//     return res.redirect('/')
//   }
//   next()
// }


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)