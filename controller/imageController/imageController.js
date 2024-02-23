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

const deleteImage = async (req, res, next) => {
    // try {
    //     const { public_id } = req.body;
    //     const imageData = await cloudinary.v2.api.delete_resources([public_id], { type: 'upload', resource_type: 'image' });
    //     req.body.imageDeleted = imageData;
    // } catch (error) {
    //     console.log(error.message);
    // }
    // next();
}

module.exports = { addImage, deleteImage }