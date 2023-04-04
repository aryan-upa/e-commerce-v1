const mongoose = require('mongoose');
const reviews = require('./Review');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    img: String,
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

// To delete all the reviews associated with product if the product gets deleted.
productSchema.pre('findOneAndDelete', async function (data) {
    console.log('pre-middle-ware function');
    console.log(data);
});

productSchema.post('findOneAndDelete', async function (data) {
    if (!(data.review.length === 0)) return;
    await reviews.deleteMany({_id: {$in: data.review}});
});

const Product = mongoose.model('Product', productSchema);
exports.prod = Product;
