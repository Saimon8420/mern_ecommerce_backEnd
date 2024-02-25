const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const { dbConnect } = require('./config/dbconfig');
const productRouter = require('./router/productRoute');
const userRouter = require('./router/userRoute');
const orderRouter = require('./router/orderRoute');
const reviewRouter = require('./router/reviewRoute');
const adminRouter = require('./router/adminRoute');
const bannerRouter = require('./router/bannerRoute');
const categoryRouter = require('./router/categoryRoute');
const port = process.env.PORT || 9001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the MERN E-commerce Server");
})

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);
app.use("/admin", adminRouter);
app.use("/banner", bannerRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
    try {
        dbConnect();
    } catch (error) {
        console.log(error.message);
    }
});



