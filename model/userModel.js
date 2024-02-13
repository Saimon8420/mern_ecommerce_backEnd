const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 30,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        min: 11,
        max: 15,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    address: {
        type: String,
        require: true,
        min: 5,
        max: 100,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;