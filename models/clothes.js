const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        store: String,
        image: String,
        like: {type: Boolean, default: false},
        link: String,
        type: String
    }, {timestamps: true}
);

const Clothes = mongoose.model('Clothes', clothesSchema);

module.exports = Clothes;