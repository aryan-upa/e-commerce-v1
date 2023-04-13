const express = require('express');
const app = express();
const router = express.Router();
const reviews = require('../models/Review');
const products = require('../models/Product');
const {validateReview} = require("../middleware");

app.use(express.urlencoded({
    extended: true
}));

router.post('/:productID', validateReview, async (req, res) => {
    try {
        const {productID} = req.params;
        const {comment, rating} = req.body;

        const product = await products.prod.findOne({_id: productID});

        const review = await reviews.create({
            rating,
            comment
        });

        product.review.push(review);
        await product.save();

        req.flash('success', 'added your review!');
        res.redirect('/products/' + productID);
    } catch (err) {
        res
            .status(500)
            .render('error', {error: err.message});
    }
});

module.exports = router;