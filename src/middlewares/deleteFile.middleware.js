//importamos librería cloudinary con la versión en la que vamos a trabajar
const cloudinary = require('cloudinary').v2

//configuramos la función de borrado según el modelo de la libreria de cloudinary
//le pasamos la URL que nos da cloudinary

const deleteImgCloudinary = (imgUrl) => {
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited[imgSplited.length - 1].split('.')
    const folderSplited = imgSplited[imgSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
}

module.exports = { deleteImgCloudinary }