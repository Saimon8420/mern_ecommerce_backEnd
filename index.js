const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const upload = require('./config/multer');
const cloudinary = require("./config/cloudinary");
const { dbConnect } = require('./config/dbconfig');
const productRouter = require('./router/productRoute');
const userRouter = require('./router/userRoute');
const orderRouter = require('./router/orderRoute');
const port = process.env.PORT || 9001;


app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the MERN E-commerce Server");
})

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.post("/images", upload.single("image"), async (req, res) => {
    try {
        const image = req.file;
        const imageUpload = await cloudinary.v2.uploader.upload(image?.path, {
            folder: 'MERN_Ecommerce',
            resource_type: 'image',
            transformation: [
                { height: 350, width: 300, crop: "fill" },
            ]
        },
        )
        res.send(imageUpload);

    } catch (error) {
        console.log(error);
    }

})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
    try {
        dbConnect();
    } catch (error) {
        console.log(error.message);
    }
});


