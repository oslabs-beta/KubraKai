
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport');
const path = require('path');
const db = require('../model/userModel');

const googleId = `${process.env.GOOGLE_CLIENT_ID}`
const googleSecret = `${process.env.GOOGLE_CLIENT_SECRET}`
const GoogleStrategy = require('passport-google-oauth20');

const customFields = { 
  usernameField: 'email',
  passwordField: 'pwd' 
};

/**
 * @author Danny Balistocky and Anthony Martinez
 * @param {*} username 
 * @param {*} password 
 * @param {*} done 
 */
const verifyCallBackLocal = async (username, password, done) => {
  const queryStrselect = `select * from users inner join localUsers on email_fk = $1`;
  const queryStrJoin = 'select * from users inner join userIp on email_fk = $1';
  db.query(queryStrJoin, [username])
  db.query(queryStrselect,[username])        
  .then(user =>{
    bcrypt.compare(password,user.rows[0].pwd)
    .then(result =>{
      if(result){
        return done(null, user.rows[0])
      } else{
        return done(null, false, { message: 'Password incorrect' })
      }
    })
    .catch(error =>{
      done(error)
    })
  })
  .catch(error =>{
    done(error);
  })
}

/**
 * @author Danny Balistocky and Anthony Martinez
 * @param {*} accessToken 
 * @param {*} refreshToken 
 * @param {*} profile 
 * @param {*} done 
 */
const verifyCallBackGoogle = (accessToken, refreshToken, profile, done) =>{

  const selectStr = `select * from users where email = $1`
  const insertUserStr = `insert into users (firstname, lastname, email) values 
                          ($1, $2, $3) returning *`;
  const insertOauthStr = `insert into oauthUsers ( oauth_id, oauth_type, email_fk) VALUES ($1,$2,$3) returning *`;
  
  db.query(selectStr,[profile.emails[0].value])
  .then(currentUser =>{
    console.log('returned value of currentUser: passport line 97:', currentUser)
    if (currentUser.rows[0]){
      done(null,currentUser.rows[0])
    }else{
      db.query(insertUserStr, [profile.name.givenName, profile.name.familyName, profile.emails[0].value])
      .then(newuser => {
        db.query(insertOauthStr, [profile.id, profile.provider, profile.emails[0].value])
        .then(queryResult =>{          
          done(null, newuser.rows[0])                
        })    
        .catch(error=>{
          res.redirect('/auth/login')
        });                
      })
      .catch(e => {
        res.redirect('/auth/login')
      });
    }  
  })
  .catch(e => {
    res.redirect('/auth/login')
  });  
}

/*
  Strategies
*/
const localStrategy  = new LocalStrategy(customFields, verifyCallBackLocal);
passport.use(localStrategy)

const googleStrategy = new GoogleStrategy({
  callbackURL:'/auth/google/redirect',
  clientID:googleId,
  clientSecret:googleSecret
  },
  verifyCallBackGoogle
);

passport.use(googleStrategy);

/*
  Serialize - Deserialize
*/
passport.serializeUser((user, done) => done(null, user.email))

passport.deserializeUser((email, done) => {
  const queryStr = `select * from users where email = $1`
    //if user doesn't exist -> return done(null, false)
    db.query(queryStr,[email])
    .then(user =>{
      done(null, user.rows[0].email);
    })
    .catch(error =>{
      console.log('at getUserByEmail error: ', error)
    })
})

