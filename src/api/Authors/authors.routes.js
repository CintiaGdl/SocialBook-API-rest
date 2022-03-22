const AuthorRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');
// Importación en ES5 - Métodos de controller
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./authors.controller');

//importamos la autenticación
const { isAuth } = require('../../middlewares/auth.middleware');

AuthorRoutes.get('/', getAll);
AuthorRoutes.get('/:id', getOne);
AuthorRoutes.post('/', [isAuth], upload.single('image'), postOne);
AuthorRoutes.patch('/:id', [isAuth], upload.single('image'), patchOne);
AuthorRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = AuthorRoutes;