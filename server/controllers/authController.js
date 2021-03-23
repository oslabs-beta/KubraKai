const bcrypt = require('bcrypt')
const db = require('../../model/userModel');

const userController = {};

/**
 * Controller that inserts a new user into the user and localUsers tables.
 * @author Danny Balistocky and Anthony Martinez
 * 
 * TODO: Use transaction to capture queryStrUser and queryStrLocalUser
 */
userController.register = (req, res, next) =>{
  const {firstname, lastname, email, pwd} = req.body
  const queryStrUser = `insert into users (firstname, lastname, email) values 
                          ($1, $2, $3);`
  const queryStrLocalUsers = `insert into localUsers (_id, pwd, email_fk) values 
  (DEFAULT, $1, $2);`

  const saltRounds = 10
  bcrypt.hash(pwd, saltRounds)
  .then(hashedPassword =>{
    db.query(queryStrUser, [firstname, lastname, email])
    .then(queryResult =>{
      db.query(queryStrLocalUsers, [hashedPassword, email])
      .then(hashedResult =>{
        return next();
      })    
      .catch(error=>{
        console.error('error during pwd query: ', error);
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
  })})                 
}

module.exports = userController;