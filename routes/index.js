const express = require('express');
const router = express.Router();
const MiddleWares = require('../dal/crud');

const getProducts = MiddleWares.getAllProducts;
const delProduct = MiddleWares.deleteProduct;
const editProduct = MiddleWares.updateProduct;
const addProduct = MiddleWares.createProduct;
const getAllCategories = MiddleWares.findAllCategories;
const addCategory = MiddleWares.createCategory;
const productsPerCategory = MiddleWares.productsPerCategory;
const addItemToCart = MiddleWares.addItemToCart;
const createCart = MiddleWares.createCart;

router.get('/getAll', getProducts, ( req, res ) => { return res.send( req.data ) });

router.put('/addproduct', addProduct, ( req, res ) => { return res.send( req.data ) });

router.patch('/editproduct/:id', editProduct ,( req, res ) => { return res.send( req.data ) });

router.delete('/delproduct/:id', delProduct , (req,res) => { return res.send( req.data ) });

router.get('/category', getAllCategories, ( req, res ) => { return res.send(req.data) });

router.put('/category', addCategory, ( req, res ) => { return res.send(req.data) });

router.get('/productspercategory/:id', productsPerCategory, ( req, res ) => { return res.send(req.data) });

router.put('/itemtocart', addItemToCart, ( req, res ) => { return res.send( req.data ) });

router.put('/cart', createCart, ( req, res ) => { return res.send( req.data ) });

module.exports = router;
