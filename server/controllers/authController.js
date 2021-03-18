const bcrypt = require('bcrypt')

const db = require('../../model/userModel');

const userController = {};

/**
 * TODO: Rollback first insert if second insert fails
 *      (option 1)
 *          use rollback features of postgres if it exist 
 *      (option 2)
 *          check if queryStrLocalUsers failed
 *          if it fails, then delete the user created at 
 *          queryStrUser
 */
userController.register = (req, res, next) =>{
  const {firstname, lastname,email, pwd} =req.body
  const queryStrUser = `insert into users (firstname, lastname, email) values 
                          ($1, $2, $3);`
  const queryStrLocalUsers = `insert into localUsers (_id, pwd, email_fk) values 
  (DEFAULT, $1, $2);`
  const saltRounds = 10
  console.log('we are just about to bcrypt!!!!!!!')
  bcrypt.hash(pwd, saltRounds)
    .then((hashedPassword)=>{
      console.log('we are just about to write to the db!!!!!!!')
      db.query(queryStrUser, [firstname, lastname, email])
        .then(queryResult =>{
          console.log('db query for queryStrUser: ',queryResult);
          db.query(queryStrLocalUsers, [hashedPassword, email])
            .then(hashedResult =>{
              console.log('db query for queryStrLocalUsers: ', hashedResult);
              res.redirect('/auth/login');
              return next();
            })    
            .catch(error=>{
              console.log('error during pwd query: ', error);
              res.redirect('/auth/register')
            })    
      })
      
      .catch(error=>{
        console.log('error during signup query: ', error);
        res.redirect('/auth/register')
      })
    .catch(error=>{
      console.log(error);
      return next(error)
    })
  })                 
}

module.exports = userController;