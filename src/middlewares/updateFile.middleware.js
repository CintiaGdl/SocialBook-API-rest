//importamos librería multer para la gestión de ficheros
const multer = require('multer');
//importamos librería para trabajar con cloudinary con la versión en la que queremos trabajar
const cloudinary = require('cloudinary').v2
//importamos multer-storage-cloudinary gestor de ficheros con cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Configuramos nuestra storage, nuestra carpeta de imagenes 
//indicamos qué formatos son los permitidos
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'SocialBook',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
    }
})

//y multer se encarga de gestionar dicha carpeta
const upload = multer({ storage });

//exportamos
module.exports = upload ;