const express = require("express");
const CategoryModel = require("../model/categoryModel");
const categoryRouter = express.Router();

categoryRouter.get("/all", async (req, res) => {
    try {
        const getCategories = await CategoryModel.find({}).select("_id title");
        res.send({ status: 201, data: getCategories });
    } catch (error) {
        console.log(error.message);
    }
})

categoryRouter.post("/add", async (req, res) => {
    try {
        const { title } = req.body;

        const addedCategory = new CategoryModel({ title });
        await addedCategory.save();

        res.send({ status: 201, msg: "category added successfully!", data: addedCategory });

    } catch (error) {
        console.log(error.message);
    }
})

categoryRouter.put("/update", async (req, res) => {
    try {
        const { id, title } = req.body;
        const findQuery = { _id: id };
        const updateCategory = await CategoryModel.findOneAndUpdate(findQuery, { title });

        res.send({ status: 201, msg: "category updated successfully", data: updateCategory });

    } catch (error) {
        console.log(error.message);
    }
})

categoryRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.deleteOne({ _id: id });

        res.send({ status: 201, msg: "category successfully deleted!!", data: deletedCategory });

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = categoryRouter;