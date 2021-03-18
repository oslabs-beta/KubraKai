
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport');
const path = require('path');
const db = require('./model/userModel');

const googleId = `${process.env.GOOGLE_CLIENT_ID}`
const googleSecret = `${process.env.GOOGLE_CLIENT_SECRET}`
const GoogleStrategy = require('passport-google-oauth20');

const customFields = { 
  usernameField: 'email',
  passwordField: 'pwd' 
};

const verifyCallBack = (username, password, done) => {
  //get user from postgres
  // console.log('inside of verify callback')
  // const queryStr = `select * from users where email = $1`
  const queryStrselect = `select * from users inner join localUsers on email_fk = $1`;

    //if user doesn't exist -> return done(null, false)
    db.query(queryStrselect,[username])
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

/*
if local then new Local else google

*/
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


// oauth_id varchar PRIMARY KEY, 
//   oauth_type varchar NOT NULL,   
//   email_fk
passport.use(new GoogleStrategy({
  //options for the google strategy
  callbackURL:'/auth/google/redirect',
  clientID:googleId,
  clientSecret:googleSecret
  },
  (accessToken, refreshToken, profile, done)=>{
    //passport callback funtion
    console.log('oauth callback function fired');
    console.log(profile)
    // queryStr contains the query string to find a user in a specific table
    const selectStr = `select * from users where email = $1`
    // text = the query that creates a new user in db, if the queryStr hasnt f0und a user already
    const insertUserStr = `insert into users (firstname, lastname, email) values 
                           ($1, $2, $3) returning *`;
    // const queryStrLocalUsers = `insert into localUsers (_id, pwd, email_fk) values 
    const insertOauthStr = `insert into oauthUsers ( oauth_id, oauth_type, email_fk) VALUES ($1,$2,$3) returning *`;
    
    db.query(selectStr,[profile.emails[0].value])
      .then(currentUser =>{
        console.log('returned value of currentUser: passport line 97:', currentUser)
        if (currentUser.rows[0]){
          //if current user has already been put in the db
          console.log('Check if user exist', currentUser.rows[0])
          //passes user info to serialize function
          done(null,currentUser.rows[0])
        }else{


          db.query(insertUserStr, [profile.name.givenName, profile.name.familyName, profile.emails[0].value])
            .then(newuser => {
              console.log('new user was created! line 106', newuser);
              //passes user info to serialize function
              db.query(insertOauthStr, [profile.id, profile.provider, profile.emails[0].value])
                .then(queryResult =>{     
                  console.log('passport line 112 ---->', queryResult.rows[0])           
                  done(null, newuser.rows[0])                
                })    
                .catch(error=>{
                  console.log('error during google insert to db 117: ', error);
                  res.redirect('/auth/login')
                })                
            })
            .catch(e => {
              console.log('we are in auth cb func',e)
              res.redirect('/auth/login')
            });
        }  
      })  
  }
))


// passport.serializeUser((user, done) => {
//   console.log('trying to serialize the user...')
//   // console.log('the whole user is:', user)
//   done(null, user.rows[0].oauth)
// })
// passport.deserializeUser((oauth, done) => {
//   const queryStr = `select * from credentials where oauth = $1`;
//   console.log('we are trying to deseriealize....')
//     //if user doesn't exist -> return done(null, false)
//     db
//       .query(queryStr,[oauth])
//       .then(user =>{
//         // console.log('at getUserByEmail', user.rows[0].email)
//         // res.locals.email = user.rows[0].email
//         done(null, user);
//       })
//       .catch(error =>{
//         console.log('at deserialize error: ', error)
//       })
// })

