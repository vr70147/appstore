const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'users'},
	date: { type: Date, default: Date.now },
	items: []
});

const Cart = mongoose.model('carts', CartSchema); 
module.exports = Cart;