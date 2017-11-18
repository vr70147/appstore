const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('../models/category');

const ProductSchema = new Schema({
	name: String,
	id: Number,
	image: String,
	price: Number,
	category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

Category.findOne({}).populate( Category.name ).exec( ( err, data ) => {
	console.log( Category.name )
});

const Product = mongoose.model('products', ProductSchema); 
module.exports = Product;
