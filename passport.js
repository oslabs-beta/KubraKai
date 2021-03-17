
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport');
const path = require('path')

//require db
const db = require('./model/userModel');

const customFields = { 
  usernameField: 'email',
  passwordField: 'pwd' 
};

const verifyCallBack = (username, password, done) => {
  //get user from postgres
  // console.log('inside of verify callback')
  const queryStr = `select * from users where email = $1`
    //if user doesn't exist -> return done(null, false)
    db.query(queryStr,[username])
      //if user does exist -> validate user, aka bcrypt ect
        //if valid -> return done(null, user) ...user is returned form promise
        
      .then(user =>{
        console.log('-------------------username is: ', username)
        console.log('at verify: ', user.rows);
        
        bcrypt.compare(password,user.rows[0].pwd)
        .then((result)=>{
          if(result){
            return done(null, user.rows[0])
          } else{
            return done(null, false, { message: 'Password incorrect' })
          }
        })
        .catch((error)=>{
          console.log('the bcrypt error is: ', error)
        })
      })
      .catch(error =>{
        console.log('at verifyCallBack error: ', error)
        done(error);
      })
}
const strategy  = new LocalStrategy(customFields, verifyCallBack);
passport.use(strategy)

passport.serializeUser((user, done) => done(null, user.email))
passport.deserializeUser((email, done) => {
  const queryStr = `select * from users where email = $1`
    //if user doesn't exist -> return done(null, false)
    db.query(queryStr,[email])
      .then(user =>{
        // console.log('at getUserByEmail', user.rows[0].email)
        // res.locals.email = user.rows[0].email
        done(null, user.rows[0].email);
      })
      .catch(error =>{
        console.log('at getUserByEmail error: ', error)
      })
})

