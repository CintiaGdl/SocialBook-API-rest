//importamos el model de asanas
const { setError } = require('../../utils/error/error');
const Author = require('./authors.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

//método para recuperar todos las asanas de la DB
const getAll = async (req, res, next) => {
    try {
        //recuperamos todas las asanas con el método find de mongoose
        const authors = await Author.find().populate('books');
        //res lo que enviamos al front status 200 todo ok cuerpo asanas en formato json
        res.status(200).json(authors);
    } catch (error) {
        return next(setError(404, 'It was not possible to get all the authors.'))
    }
}

//método para recuperar una secuence de la DB
const getOne = async (req, res, next) => {
    try {
        //req recupera valores de la request de la url...10 guardamos el id mediante destructuring
        const { id } = req.params;
        //findById por parametro recibe un id y lo busca
        const author = await Author.findById(id).populate('books');
        res.status(200).json(author);
    } catch (error) {
        return next(setError(404, 'It was not possible to get this author.'))
    } 
}

//método para crear una nueva secuence
const postOne = async (req, res, next) => {
    try {
        //variable para introducir los datos desde el front
        const author = new Author(req.body);
        if (req.file) author.image = req.file.path;
        //guardamos la info nueva mediante el metodo de mongoose save
        const authorDB = await author.save();
        return res.status(201).json(authorDB);
    } catch (error) {
        return next(setError(404, 'It was not possible to create a new author.'))
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = new Author(req.body);
        author._id = id;
        if (req.file) author.image = req.file.path;
        const updateAuthor = await Author.findByIdAndUpdate(id, author);
        return res.status(200).json(updateAuthor);
    } catch (error) {
        return next(setError(404, 'It was not possible to modify this author.'));
    }
}

//metodo para eliminar en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await Author.findByIdAndDelete(id);
        if (author.image) deleteImgCloudinary(author.image);
        return res.status(200).json(author);
    } catch (error) {
        return next(setError(404, 'It was not possible to delete this author.'));
    } 
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}