const ProductModel = require("../../model/productModel");

const getEachProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const getProducts = await ProductModel.findOne({ _id: id }).populate({
            path: "image", // from product schema
            select: "secure_url public_id",
        }).populate({
            path: "category", // from category schema
            select: "title",
        }).select("-createdAt -updatedAt");
        res.send({ status: 201, data: getProducts });
    } catch (error) {
        console.log(error.message);
    }
}

const getAllProduct = async (req, res) => {
    try {
        const getProducts = await ProductModel.find({}).populate({
            path: "image", // from product schema
            select: "secure_url public_id",
        }).populate({
            path: "category", // from category schema
            select: "title",
        }).select("-createdAt -updatedAt");
        res.send({ status: 201, data: getProducts });

    } catch (error) {
        console.log(error.message);
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, description, price, inStock, onSale, sizes, category } = req.body;
        const { imageData } = req.body;

        const addedProduct = await new ProductModel({
            title, description, price, sizes, inStock, onSale, image: imageData, category
        })
        await addedProduct.save();

        res.send({ status: 201, msg: "product successfully added", data: addedProduct });

    } catch (error) {
        console.log(error.message);
        res.send({ status: 501, msg: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, inStock, newPrice, onSale, price, sizes } = req.body;

        // console.log(title, description, category, inStock, newPrice, onSale, price, sizes);
        const findQuery = { _id: id };
        const updateData = await ProductModel.findOneAndUpdate(findQuery, { title, description, category, inStock, newPrice, onSale, price, sizes });

        res.send({ status: 201, msg: "product updated successfully", data: updateData });

    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { imageDeleted } = req.body;
        res.send(imageDeleted);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { getAllProduct, addProduct, updateProduct, deleteProduct, getEachProduct }