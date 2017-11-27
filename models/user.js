const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	fname: String,
	lname: String,
	role: String,
	username: String,
	id: Number,
	password: String,
	city: String,
	street: String,
});

const User = mongoose.model('users', UserSchema); 
module.exports = User;