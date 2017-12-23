
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const passportHandlers = {
  login: ( email, password, done ) => {
    User.findOne({ email } , ( err, user ) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false, {message: 'User not found'}) }
        const hashPassword = user.password;
        const parsePassword = bcrypt.compareSync(password, hashPassword);
        if(!parsePassword) {
          return done(null, false, {message: 'invalid password'})
        }
        return done(null, user);
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


