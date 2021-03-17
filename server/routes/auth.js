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

// router.post('/login', passport.authenticate('local'), 
//   // {  
//   //   successRedirect:'../rome.html',// successful redirect sends here!!!
//   //   failureRedirect:'/auth/register',
//   //   failureFlash: true
//   // }, 
//   (req,res)=>{
//     console.log('after pass.auth', req.user)
//     return res.redirect('/profile/')
//     // res.sendFile(path.resolve(__dirname, "../../index.html"));

//   }
// );

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile/');
    });
  })(req, res, next);
});

module.exports = router;



// router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

// router.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: "/" }), function (req, res) {
//         if (req.user || req.session.user)
//             return res.redirect('/' + req.user._id || req.session.user._id);
//         return res.redirect('/login');
//     });