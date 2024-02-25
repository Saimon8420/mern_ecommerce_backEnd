const cloudinary = require("../../config/cloudinary");
const ImageModel = require("../../model/imageModel");

const addImage = async (req, res, next) => {
    try {
        const images = await req.files;
        // we have to map to get each image and to upload each image individually
        const imageUpload = images.map(async each => await cloudinary.v2.uploader.upload(each?.path, {
            folder: 'MERN_Ecommerce',
            resource_type: 'image',
            transformation: [
                { height: 350, width: 300, crop: "fill" },
            ]
        },
        ))
        const uploadedData = await Promise.all(imageUpload);

        // map all the images to store in image collections
        const imagesId = [];
        // Promise.all(), the if statement will be executed only after all the addedImage.save() operations are completed, and imagesId array is populated with all the _id values.
        await Promise.all(uploadedData?.map(async (each) => {
            const addedImage = new ImageModel({
                secure_url: each?.secure_url,
                public_id: each?.public_id,
            })
            await addedImage.save();
            imagesId.push(addedImage?._id);
        }));

        if (imagesId.length !== 0) {
            req.body.imageData = imagesId;
            next();
        }

    } catch (error) {
        console.log(error.message);
        res.send({ status: 501, msg: error.message });
    }
}

const deleteImage = async (req, res) => {
    try {
        const { public_id, _id } = req.body[0];
        const imageData = await cloudinary.v2.api.delete_resources([public_id], { type: 'upload', resource_type: 'image' });
        const deleteImage = await ImageModel.findByIdAndUpdate({ _id }, { secure_url: "", public_id: "" });

        res.send({ status: 201, msg: "image removed successfully", data: { imageData, deleteImage } })
    } catch (error) {
        console.log(error.message);
    }
};

const updateImage = async (req, res, next) => {
    try {
        const images = await req.files;
        const id = req.body.storedId;
        if (images?.length !== 0) {
            // Map each image upload operation to its respective Cloudinary response
            const imageUpload = images.map(async (each, index) => {
                const cloudinaryResponse = await cloudinary.v2.uploader.upload(each.path, {
                    folder: 'MERN_Ecommerce',
                    resource_type: 'image',
                    transformation: [
                        { height: 350, width: 300, crop: "fill" },
                    ]
                });
                // Update the corresponding document in ImageModel based on the ID
                await ImageModel.findByIdAndUpdate(id[index], {
                    secure_url: cloudinaryResponse.secure_url,
                    public_id: cloudinaryResponse.public_id
                });
            });
            // Wait for all image upload operations to complete
            await Promise.all(imageUpload);
            next();
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error.message);
        res.send({ status: 501, msg: error.message });
    }
}

module.exports = { addImage, deleteImage, updateImage }