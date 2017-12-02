
const mongoose = require('mongoose');
const User = require('../models/user');

const passportHandlers = {
  login: (username, password, done) => {
    User.findOne({username}, (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false, {message: 'User not found'}) }
      if (user.password !== password) { return done(null, false, {message: 'Incorrect password'}) }
      return done( null, user );
    });
  },
  register: ( username, password, done ) => {
   User.getUserByUsername( username, ( err, user ) => {
    if(err) throw err;
    if(!user){ return done(null, false, {message: 'Unknown User'}) }
    User.comparePassword( password, user.password, (err, isMatch) => {
      console.log(password, user.password);
      if(err) throw err;
      if(isMatch){

       return done(null, user) } 
      return done(null, false, {message: 'Invalid password'});
    });
   });
  },
  serializeUser: (user, done) => done(null, user),
  deserializeUser: (user, done) => done(null, user),
  validatedUser: (req, res, next) => {

    if (req.isAuthenticated()) {
      return next();
    }
    return res.sendStatus(401);
  }
}

module.exports = passportHandlers;


