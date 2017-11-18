const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: String,
	id: Number,
	image: String,
	price: Number,
	category: String
});

const Product = mongoose.model('products', ProductSchema); 
module.exports = Product;
