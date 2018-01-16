const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const CartItem = require('../models/product-from-cart');
const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');
const pdf = require('pdfkit');
const fs = require('fs');
const async = require('async');


const errorHandler = (err, res, cb ) => {
	if(err) {
		return res.json(err);
	}
	return cb();
}
const successHandler = (req, data, next) => {
	req.data = data;
	return next();
}

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
		productToUpdate.price = req.body.price;
		productToUpdate.category = req.body.category;
		productToUpdate.save(( err, data )=> {
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

const addItemToCart = ( req, res, next ) => {
	Cart.update( { _id: req.user.cart }, { $push: { items: req.body } },( err, data ) =>
		errorHandler( err, res, () => successHandler( req, data, next ) ));

};
const removeItemFromCart = ( req, res, next ) => {
	Cart.update( { _id: req.user.cart }, { $pull: { items: req.body } },( err, data ) =>
		errorHandler( err, res, () => successHandler( req, data, next ) ));
};

const removeAll = ( req, res, next ) => {
	Cart.update( { _id: req.user.cart }, { $pullAll: { items: req.body } },( err, data ) =>
		errorHandler( err, res, () => successHandler( req, data, next ) ));
};

const createCart = ( req, res, next ) => {
	const newCart = new Cart( req.body );
	newCart.save( ( err, cart ) => {
		req.user.cart = cart._id;
		User.update({_id: req.user._id},{ $set : { cart: cart._id } }, ( err, data ) => {
			return next();
		})
	});
};

const getCart = ( req, res, next ) => {
	Cart.find({_id: req.user.cart }).populate('userId').exec(( err, carts ) => {
		errorHandler(err, res, () => successHandler(req, carts, next));
	});
};
const getItemFromCart = ( req, res, next ) => {
	if( req.user.cart ) {
		Cart.find({_id: req.user.cart }, ( err, carts ) => {
			errorHandler(err, res, () => successHandler(req, carts, next));
		});	
	}
	
}; 
const createOrder = ( req, res, next ) => {
	const newOrder = new Order( req.body );
	newOrder.save(( err, data ) => {
		Cart.find({_id: req.user.cart}, ( err, cart ) => {
			const receipt = new pdf;
			let count = 1;
			receipt.pipe(fs.createWriteStream('public/receipts/receipt_no-'+ cart[0]._id +'.pdf', {flag: 'a', encoding: 'utf8'}));
				receipt
				.fontSize(15)
				.text(	'Receipt for order no\' ' + cart[0]._id + '\n' +
						'________________________________________________' + '\n', 30, 30);
				for( let i = 0 ; i < cart[0].items.length ; i++ ){
					receipt.moveDown();	
					receipt.text('\n' + cart[0].items[i].name + ' X' + cart[0].items[i].quantity + ' price: ' + cart[0].items[i].price + 'ILS' + '\n')
				} 
			receipt.end();
			data.cart = cart[0]._id
			if ( err ) return res.json( err )
				errorHandler(err, res, () => successHandler(req, data, next));
		
		}); 
		
	});
};

const getOrders = ( req, res, next ) => {
	Order.find({}, ( err, orders ) => {
		errorHandler(err, res, () => successHandler(req, orders, next));
	});
}; 

const destroyCart = (req, res, next ) => {
	Cart.remove({ _id: req.user.cart }, ( err, removedCart ) => {
		User.update({_id: req.user._id},{ $unset : { cart: req.user.cart } }, ( err, data ) => {
			req.session.passport.user.cart = null;
			return next();
		})
		
	});
};

const updateItemInCart = ( req, res, next ) => {
	Cart.update( { _id: req.user.cart }, { $set: { items: req.body } },( err, data ) =>
		errorHandler( err, res, () => successHandler( req, data, next ) ));
}

const MiddleWares = {
	createProduct,
	updateProduct,
	deleteProduct,
	getAllProducts,
	findAllCategories,
	createCategory,
	productsPerCategory,
	addItemToCart,
	createCart,
	getCart,
	removeItemFromCart,
	getItemFromCart,
	createOrder,
	getOrders,
	destroyCart,
	updateItemInCart,
	removeAll
};

module.exports = MiddleWares;