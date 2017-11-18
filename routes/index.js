const express = require('express');
const router = express.Router();
const MiddleWares = require('../dal/crud');

const getProducts = MiddleWares.getAllProducts;
const delProduct = MiddleWares.deleteProduct;
const editProduct = MiddleWares.updateProduct;
const addProduct = MiddleWares.createProduct;
const getCategory = MiddleWares.findCategory;
const getAllCategories = MiddleWares.findAllCategories;
const addCategory = MiddleWares.createCategory;


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

router.get('/category/:item', getCategory, ( req, res ) => {
	return res.send(req.data);
});
router.get('/category', getAllCategories, ( req, res ) => {
	return res.send(req.data);
});
router.put('/category', addCategory, ( req, res ) => {
	return res.send(req.data);
} )

module.exports = router;
