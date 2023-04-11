const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {validateProduct} = require('../middleware');

router.get('/', async (req, res) => { // for /products/
    try {
        const products = await Product.prod.find({});
        res.render('./products/product', {products, msg: req.flash('msg')});
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
});

router.get('/show', (req, res) => { // for /products/show
    try{
        res.send('showing products!');
        res.end();
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
});

router.post('/', validateProduct, async (req, res) => {
    try {
        const {name, img, desc, price} = req.body;
        await Product.prod.create({ name, price, desc, img });

        req.flash('msg', 'product added successfully!');
        res.redirect('/products');
    } catch (err) {
        res
            .status(500)
            .render('error', {err});
    }
});

router.get('/new', (req, res) => {
    res.render('./products/new');
})

router.get('/:productID', async (req, res) => {
    try {
        const {productID} = req.params;
        const product = await Product.prod.findById(productID).populate('review');
        res.render('./products/show', {product, msg: req.flash('msg')});
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
});

router.get('/:productID/edit', async (req, res) => {
    try {
        const {productID} = req.params;
        const product = await Product.prod.findById(productID);
        res.render('./products/edit', {product});
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
});

router.patch ('/:productID', validateProduct, async (req, res) => {
    try {
        const {productID} = req.params;
        const {name, img, price, desc} = req.body;

        const product = await Product.prod.findByIdAndUpdate(productID, {name, img, price, desc});
        console.log(product);

        req.flash('msg', 'product edited successfully!');
        res.redirect('/products/' + productID);
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
});

router.delete('/:productID', async (req, res) => {
    try {
        const {productID} = req.params;
        const product = await Product.prod.findById({_id: productID});

        await Product.prod.findByIdAndDelete({_id: productID});
        req.flash('msg', 'product removed successfully!');
        res.redirect('/products');
    } catch (err) {
        res.status(500);
        res.render('error', {err});
    }
})

module.exports = router;