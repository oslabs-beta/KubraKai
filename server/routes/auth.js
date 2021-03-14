const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const authController = require('../controllers/authController')


router.get('/register', (req,res)=>{
  res.render('register.ejs')
})

router.post('/register', authController.register, (req, res)=>{
  console.log('at register');
});

router.get('/login', (req,res)=>{
  res.render('login.ejs')
});

router.post('/login', passport.authenticate('local', 
  {  successRedirect:'/',// successful redirect sends here!!!
    failureRedirect:'/auth/register',
    failureFlash: true
  }
));

module.exports = router;