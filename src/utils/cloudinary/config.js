//importamos libreria cloudinary con la versión
const cloudinary = require('cloudinary').v2;

//configuración de uso de cloudinary
const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY
    })
}

module.exports = { configCloudinary };