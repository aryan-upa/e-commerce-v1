const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String
});

const reviews = new mongoose.model('Review', reviewSchema);
module.exports = reviews;