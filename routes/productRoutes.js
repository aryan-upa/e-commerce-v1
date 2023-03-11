const express = require('express');
const app = express();
const router = express.Router();
const Product = require('../models/Product');

app.use(express.urlencoded({
    extended: true
}));

router.get('/', async (req, res) => { // for /products/
    const products = await Product.prod.find({});
    res.render('./products/product', {products});
});

router.get('/show', (req, res) => { // for /products/show
    res.send('showing products!');
    res.end();
});

router.post('/', async (req, res) => {
    const {name, img, desc, price} = req.body;

    await Product.prod.insertMany([{
        name: name,
        price: price,
        desc: desc,
        img: img
    }]);

    res.redirect('/products');
});

router.get('/new', (req, res) => {
    res.render('./products/new');
})

router.get('/:productID', async (req, res) => {
    const {productID} = req.params;
    const product = await Product.prod.findById(productID).populate('review');
    res.render('./products/show', {product});
});

router.get('/:productID/edit', async (req, res) => {
    const {productID} = req.params;
    const product = await Product.prod.findById(productID);
    res.render('./products/edit', {product});
});

router.patch ('/:productID', async (req, res) => {
    const {productID} = req.params;
    const {name, img, price, desc} = req.body;
    // console.log(req.body);


    const product = await Product.prod.findByIdAndUpdate(productID, {name, img, price, desc});
    console.log(product);

    res.redirect('/products/'+productID);
});

router.delete('/:productID', async (req, res) => {
    const {productID} = req.params;
    await Product.prod.deleteOne({_id: productID});
    res.redirect('/products');
})

module.exports = router;