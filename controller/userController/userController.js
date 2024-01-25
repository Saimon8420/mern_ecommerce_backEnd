const bcrypt = require("bcrypt");
const UserModel = require("../../model/userModel");
require("dotenv").config();
const saltRound = 10;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const registerController = async (req, res) => {
    const { name, address, phone, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, saltRound);
    try {
        const newUser = new UserModel({
            name,
            address,
            phone,
            email,
            password: hashedPass,
        })
        await newUser.save();
        res.send({ status: 201, msg: "user successfully created", data: newUser })
    } catch (error) {
        console.log(error.message);
    }
};

const loginController = async (req, res) => {
    const { email } = req.body;
    try {
        const token = jwt.sign({
            data: email,
        }, jwtSecret, { expiresIn: '1h' });

        res.send({ status: 201, msg: "login successful", token: token })

    } catch (error) {
        console.log(error.message);
    }
}

const getUserDataController = async (req, res) => {
    const header = req.headers.authorization;
    try {
        if (header !== undefined) {
            const token = header.split("Bearer ");
            const decoded = jwt.verify(token[1], jwtSecret);

            const user = await UserModel.findOne({ email: decoded.data }).select("-password  -isBanned");
            // here select only use one parameters thats this only approach works.
            res.send({ data: user });
        }
    } catch (error) {
        console.log(error);
    }

}

const updateController = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    // if any params comes with empty value than it will update, so to avoid this we have to pass only updated params with value, this should implement into client server

    const options = { new: true }
    try {
        const findUser = await UserModel.findByIdAndUpdate(id, { name, email, phone, address }, options).select("-password -isBanned");
        if (findUser) {
            res.send({ status: 201, msg: "Data updated successful", data: findUser })
        }
        else {
            res.send({ status: 500, msg: "Something went wrong, while updating!" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { registerController, loginController, getUserDataController, updateController }