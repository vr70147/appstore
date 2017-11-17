const express = require('express');
const Product = require('../models/product');

const getAllProducts = ( req, res, next ) => {
	Product.find({}, ( err, products ) => {
        if (err) return res.status( 500 ).send("There was a problem finding the product.");
        res.status( 200 ).send( products );
	})
};

const createProduct = ( req, res, next ) => {
	const newProduct = new Product( req.body );
	newProduct.save(( err, data ) => {
		if ( err ) return res.json( err )
		req.data = data;
		return next();
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

const MiddleWares = { createProduct, updateProduct, deleteProduct, getAllProducts };
module.exports = MiddleWares;