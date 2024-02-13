const { Schema, default: mongoose } = require("mongoose");
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        maximum: 30,
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;