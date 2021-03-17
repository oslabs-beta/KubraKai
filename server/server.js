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
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view-engine','ejs')
app.use(bodyParser.json());
app.use('*', cors());
// app.use(methodOverride('_method'))

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(flash());

require('../passport');
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
app.use('/auth', (req,res, next)=>{
  console.log('hello before authRouter')
  next()
}, authRouter);

app.use('/profile', (req,res, next)=>{
  console.log('hello prof')
  next()
  },profileRouter);

app.get("/", 
(req, res) => {
  console.log(req.session)
  req.session.viewCount +=1
  console.log('youve been here: ', req.session.viewCount)
  // res.render('index.ejs',{name:req.user.name})
  res.sendFile(path.resolve(__dirname, "../index.html"));
});


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at 4000`)
)