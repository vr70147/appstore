const express = require('express');
const router = express.Router();
const MiddleWares = require('../dal/crud');

const getProducts = MiddleWares.getAllProducts;
const delProduct = MiddleWares.deleteProduct;
const editProduct = MiddleWares.updateProduct;
const addProduct = MiddleWares.createProduct;

router.get('/getAll', getProducts, ( req, res ) => {
	return res.send( req.data );
});

router.put('/add-product', addProduct, ( req, res ) => {
	return res.send( req.data );
});

router.patch('/edit-product/:id', editProduct ,( req, res ) => {
	return res.send( req.data );
});

router.delete('/del-product/:id', delProduct , (req,res) => {
	return res.send( req.data );
});

module.exports = router;
