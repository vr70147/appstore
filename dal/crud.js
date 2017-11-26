const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');

const getAllProducts = ( req, res, next ) => {
	Product.find({}).populate('category').exec( ( err, category ) => {
		if (err){ return console.log(err)};
		res.status(200).json(category);
	});
};

const createProduct = ( req, res, next ) => {
	const newProduct = new Product( req.body );
	newProduct.save(( err, data ) => {
		Product.findOne(data).populate('category').exec( ( err, choosenCategory ) => {
			if ( err ) {return console.log(err)};
			res.json(choosenCategory);
			return next();
		});
	});
};

const updateProduct = ( req, res, next ) => {
	Product.findOne({ _id: req.params.id }, ( err, data ) => {
		const productToUpdate = data;
		productToUpdate.name = req.body.name;
		productToUpdate.image = req.body.image;
		productToUpdate.serial = req.body.serial;
		productToUpdate.content = req.body.content;
		productToUpdate.price = req.body.price;
		productToUpdate.quantity = req.body.quantity;
		productToUpdate.save(( err, data )=>{
			if( err ) console.log(err);
			return res.json(data);
		});
	});
};

const deleteProduct = ( req, res, next ) => {
	Product.remove({ _id: req.params.id }, ( err ) => {
		if (err) console.log(err);
		else console.log('product has deleted successfuly!');
	});
	return next();

};
const findAllCategories = ( req, res, next ) => {
	Category.find({}).populate('_id').exec( ( err, product ) => {
		if (err){ return console.log(err)};
		res.status(200).json(product);
	}) 
};

const productsPerCategory = ( req, res, next ) => {
	Product.find({ category: req.params.id }).populate('category').exec( ( err, products ) => {
		if (err){ return console.log(err)};
		res.status(200).json(products);
		return next();
	}) 
};

const createCategory = ( req, res, next ) => {
	const newCategory = new Category( req.body );
	newCategory.save(( err, data ) => {
		if ( err ) return res.json( err )
		req.data = data;
		return next();
	});
};




const MiddleWares = { createProduct, updateProduct, deleteProduct, getAllProducts, findAllCategories, createCategory, productsPerCategory };
module.exports = MiddleWares;