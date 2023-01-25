const express = require('express');
const router = express.Router();
const signup = require('../model/signup');
const {insertEmployee, getPassword} = require('../util/controller');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
// const db = require('../model/signup');

router.get('/signup', function (req, res, next) {
    res.render('signup')
  })
  
  router.get('/login', function (req, res, next) {
    res.render('login');
  })

  router.post('/signup', async function(req, res, next) {

    try{
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const signup = await insertEmployee(username, email, password)
      .then(() => {
        res.status(201).json({
          message : 'Data Created' 
        })
      })
    } catch(err){
      res.status(500).json({
        error : err
      })
    }

})

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

  passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try{
        const getData = await getPassword(username)
        if(getData.password == password){
           return cb(null,username)
        } else {
            return cb(null, false, {message : 'Incorrect Username and Password'})
        }
    }catch(err){
        console.log(err);
        return cb(null, false)
    } 
    


  }));


module.exports = router;
