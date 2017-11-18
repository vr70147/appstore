const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	category: [{
		_id: Schema.Types.ObjectId,
		name: String
	}] 
});



const Category = mongoose.model('category', CategorySchema); 
module.exports = Category;