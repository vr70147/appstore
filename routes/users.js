const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Cart = require('../models/cart');

router.get('/session', ( req, res ) => {
	User.find({}, (err, cart) => {
		return res.send(req.session);
	})
});

router.post('/logout', ( req, res ) => {
  req.session.destroy( err => {
  	if (err) throw err
  })
  return res.redirect('/');
});

router.post('/login', passport.authenticate('local', { 
	failureRedirect : '/#!/users/login?status=1'
}), ( req, res ) => {
	if(req.session.passport.user.role) {
		return res.redirect('/#!/admin');
	};
	if(!req.session.passport.user.role) {
		return res.redirect('/');
	};
});

router.post('/register',( req, res ) => {
	const id = req.body.id;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	const city = req.body.city;
	const street = req.body.street;
	const fname = req.body.fname;
	const lname = req.body.lname;
		
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('street', 'Street is required').notEmpty();
	req.checkBody('fname', 'Firstname is required').notEmpty();
	req.checkBody('lname', 'lastname is required').notEmpty();

	const errors = req.validationErrors();
	const newUser = new User({
		id: id,
		email: email,
		password: password,
		city: city,
		street: street,
		fname: fname,
		lname: lname
	});
	if( errors ){ return res.json( { errors:errors } ) }
		User.createUser( newUser, ( err, user ) => {
			if( err ) throw err;
			return res.redirect('/#!/main');
		});
	});

module.exports = router;