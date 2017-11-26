const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', ( req, res ) => {
	return res.redirect('/register.html');
});

router.get('/session', ( req, res ) => {
	return res.send(req.session);
});

router.post('/logout', ( req, res ) => {
  req.session.destroy( err => {
  	if (err) throw err
  })
  return res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
	successRedirect : '/', 
	failureRedirect : '/#!/users/login?status=1',
	failureFlash : false
}));

router.post('/register',( req, res ) => {
	const firstName = req.body.fname;
	const lastName = req.body.lname;
	const username = req.body.username;
	const password = req.body.password;
	const newUser = new User();

	newUser.fname = firstName;
	newUser.lname = lastName;
	newUser.username = username;
	newUser.password = password;

	User.findOne({username}, ( err, user ) => {
		if (user) return res.send('user is already exist');
		newUser.save( ( err, savedUser ) => {
			if ( err ) {
				console.log( err );
				return res.status(500).send();
			}
			return res.status(200).redirect('/users/login');

		});
	})
	
});

module.exports = router;