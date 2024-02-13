const { Schema, default: mongoose } = require("mongoose");

const imageSchema = new Schema({
    secure_url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ImageModel = mongoose.model("Images", imageSchema);

module.exports = ImageModel;