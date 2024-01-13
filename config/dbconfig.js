const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log("DB Connected Successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { dbConnect };