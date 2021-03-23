if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const flash = require('express-flash');
const path = require('path')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const passport = require('passport');
const session = require('express-session')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view-engine','ejs')
app.use(bodyParser.json());
app.use('*', cors());

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use('/client', express.static(path.resolve(__dirname, '../client')));
app.use(flash());

/**
 * TODO: 
 *  -save to a session database
 *  -set expiration
 */
require('./passport');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  })
);

//intializes passport for all requests
app.use(passport.initialize())
app.use(passport.session())

//Router
app.use('/auth', checkNotAuthenticated, authRouter);

app.use('/profile', checkAuthenticated, profileRouter);

//Dashboard
app.get("/", 
  checkAuthenticated,  
  (req, res) => {
    req.session.viewCount +=1;
    res.sendFile(path.resolve(__dirname, "../index.html"));
});

// check to see if a user is authenticated
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
 res.redirect('/auth/login')
}
// check to see if a user is NOT authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { //passport feature
    return res.redirect('/')
  }
  next()
}

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at 4000`)
)
module.exports = app;