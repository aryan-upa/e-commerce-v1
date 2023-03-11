const express = require('express');
const app = express();
const router = express.Router();
const reviews = require('../models/Review');
const products = require('../models/Product');

app.use(express.urlencoded({
    extended: true
}));

router.post('/:productID', async (req, res) => {
    const {productID} = req.params;
    const {comment, rating} = req.body;

    const product = await products.prod.findOne({_id: productID});

    const review = await reviews.create({
        rating,
        comment
    });

    await product.review.push(review);
    await product.save();

    res.redirect('/products/' + productID);
});

module.exports = router;