const { addImage, deleteImage } = require("../controller/imageController/imageController");
const { getAllProduct, addProduct, updateProduct, deleteProduct } = require("../controller/productController/productController");

const upload = require("../config/multer");

const productRouter = require("express").Router();

productRouter.get("/allProduct", getAllProduct);

// ALL this route is only access-able for admin
// productRouter.post("/addProduct", upload.single("image"), addImage);

productRouter.post("/addProduct", upload.array("images"), addImage, addProduct);

productRouter.put("/updateProduct/:id", updateProduct);

// productRouter.delete("/deleteProduct/:id", deleteProduct);

productRouter.delete("/deleteProduct/", deleteImage);

module.exports = productRouter;