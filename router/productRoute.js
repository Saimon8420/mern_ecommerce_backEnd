const { addImage, deleteImage, updateImage } = require("../controller/imageController/imageController");
const { getAllProduct, addProduct, updateProduct, deleteProduct, getEachProduct } = require("../controller/productController/productController");

const upload = require("../config/multer");

const productRouter = require("express").Router();

productRouter.get("/allProduct", getAllProduct);

// ALL this route is only access-able for admin
// productRouter.post("/addProduct", upload.single("image"), addImage);

productRouter.get("/:id", getEachProduct);

productRouter.post("/addProduct", upload.array("images"), addImage, addProduct);

productRouter.put("/updateProduct/:id", upload.array("images"), updateImage, updateProduct);

// productRouter.delete("/deleteProduct/:id", deleteProduct);

productRouter.delete("/removeImages", deleteImage);

module.exports = productRouter;