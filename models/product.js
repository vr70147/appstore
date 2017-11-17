const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: String,
	image: String,
	price: String
});

const Product = mongoose.model('products', ProductSchema); 
module.exports = Product;