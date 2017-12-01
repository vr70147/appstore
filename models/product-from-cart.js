const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/product');
const Cart = require('../models/cart');

const CartItemSchema = new Schema({
	productId: { type: Schema.Types.ObjectId, ref: 'products'},
	quantity: { type: Schema.Types.ObjectId, ref: 'products'},
	price: { type: Schema.Types.ObjectId, ref: 'products'},
	cartId: { type: Schema.Types.ObjectId, ref: 'carts'}
});

const CartItem = mongoose.model('cart_items', CartItemSchema); 
module.exports = CartItem;