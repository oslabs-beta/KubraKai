const bcrypt = require('bcrypt')

const db = require('../../model/userModel');

const userController = {};

/**
 * 
 */
userController.register = (req, res, next) =>{
  const {firstname, lastname,email, pwd} =req.body
  const queryStr = `insert into users (firstname, lastname, email, pwd) values 
                          ($1, $2, $3, $4);`
  const saltRounds = 10
  console.log('we are just about to bcrypt!!!!!!!')
  bcrypt.hash(pwd, saltRounds)
    .then((hashedPassword)=>{
      console.log('we are just about to write to the db!!!!!!!')
      db.query(queryStr, [firstname, lastname, email, hashedPassword])
      .then(queryResult =>{
        console.log(queryResult);
        res.redirect('/login');
        return next();
      })
      .catch(error=>{
        console.log('error during signup query: ', error);
        res.redirect('/register')
      })
    .catch(error=>{
      console.log(error);
      return next(error)
    })
  })                 
}



module.exports = userController;