const {productSchema, reviewSchema} = require('./schemas');

const validateProduct = (req, res, next) => {
    const {name, img, desc, price} = req.body;
    const {error} = productSchema.validate({name, img, desc, price});

    if (error) {
        const message = error.details.map(v => v.message).join(', ');
        return res.render('error', {err: message});
    }

    next();
};

const validateReview = (req, res, next) => {
    next();
};

module.exports = {
    validateProduct,
}