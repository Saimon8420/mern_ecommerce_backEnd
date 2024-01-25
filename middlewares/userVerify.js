const UserModel = require("../model/userModel");

const bcrypt = require("bcrypt");

const loginVerify = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const exist = await UserModel.findOne({ email: email });
        if (exist.length !== 0) {

            const matchPass = await bcrypt.compare(password, exist.password);

            if (matchPass) {
                next();
            }
            else {
                res.send({ status: 500, msg: "invalid email/password" });
            }
        }
        else {
            res.send({ status: 500, msg: "No user found with this email/password" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const registerVerify = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const exist = await UserModel.find({ email: userEmail });
        if (exist.length !== 0) {
            res.send({ status: 500, msg: "User already exist,please login" });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { loginVerify, registerVerify };