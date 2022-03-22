const BooksRoutes = require('express').Router();
//importamos la subida de fotos con nuestro middleware
const upload = require('../../middlewares/updateFile.middleware');
// Importación en ES5 - Métodos de controller
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./books.controller');

//importamos la autenticación
const { isAuth } = require('../../middlewares/auth.middleware')

//importamos nuestros endpoints
BooksRoutes.get('/', getAll);
BooksRoutes.get('/:id', getOne);
BooksRoutes.post('/', [isAuth], upload.single('image'), postOne);
BooksRoutes.patch('/:id', [isAuth], upload.single('image'), patchOne);
BooksRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = BooksRoutes;