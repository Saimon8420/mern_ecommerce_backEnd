const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 30,
    },
    description: {
        type: String,
        require: true,
        min: 10,
        max: 500,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        require,
    },
    sizes: {
        type: Array,
        default: [],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    newPrice: {
        type: Number,
        default: 0,
    },
    image: [{
        type: ObjectId,
        ref: 'Images', //'Images' is the name of my image model
        //const ImageModel = mongoose.model("Images", imageSchema);
    }]
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;