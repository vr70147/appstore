const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UserSchema = new Schema({
	id: { type: Number, require: true, uniq: true, index: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
	password2: { type: String, require: true },
	city: { type: String },
	street: { type: String },
	fname: { type: String, require: true },
	lname: { type: String, require: true },
	cart: { type: Schema.Types.ObjectId, ref: 'carts'},
	role: String
});

const User = mongoose.model('users', UserSchema); 
module.exports = User;

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });

	});
}