const ProductModel = require("../../model/productModel");

const getAllProduct = async (req, res) => {
    try {
        const getProducts = await ProductModel.find({}).populate({
            path: "image", // from product schema
            select: "_id secure_url public_id",
        }).select("-createdAt -updatedAt");
        console.log(getProducts);
        res.send({ status: 201, data: getProducts });

    } catch (error) {
        console.log(error.message);
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, description, price, inStock, onSale, sizes } = req.body;

        const { imageData } = req.body;

        const addedProduct = await new ProductModel({
            title, description, price, sizes, inStock, onSale, image: imageData
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

module.exports = { getAllProduct, addProduct, updateProduct, deleteProduct }