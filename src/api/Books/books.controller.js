//importamos el model de asanas
const Book = require('./books.model');
//importamos middleware para el borrado de las imagenes asociadas 
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

const { setError } = require('../../utils/error/error');

//método para recuperar todos las asanas de la DB
const getAll = async (req, res, next) => {
    try {
        //recuperamos todas las asanas con el método find de mongoose
        const books = await Book.find();
        //res lo que enviamos al front status 200 todo ok cuerpo asanas en formato json
        res.status(200).json(books);
    } catch (error) {
        return next(setError(404, 'It was not possible to get all books.'))
    }
}

//método para recuperar una asana de la DB
const getOne = async (req, res, next) => {
    try {
        //req recupera valores de la request de la url...10 guardamos el id mediante destructuring
        const { id } = req.params;
        //findById por parametro recibe un id y lo busca
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        return next(setError(404, 'It was not possible to get this book.'))  
    } 
}

//método para crear una nueva asana
const postOne = async (req, res, next) => {
    try {
        //variable para introducir los datos desde el front
        const book = new Book(req.body);
        //el body es la info que nos llega desde el front
       /*  asana.name = req.body.name;
        asana.description = req.body.description; */
        //si la imagen no fuera requerida sería if (req.file) movie.img = req.file.path
        if (req.file) book.image = req.file.path;
        //guardamos la info nueva mediante el metodo de mongoose save
        const bookDB = await book.save();
        return res.status(201).json(bookDB);
    } catch (error) {
        return next(setError(404, 'It was not possible to create a new book.'))
    }
}

//metodo para modificar una asana en base a su id
const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = new Book(req.body);
        book._id = id;
        if (req.file) book.image = req.file.path;
        const updateBook = await Book.findByIdAndUpdate(id, book);
        return res.status(200).json(updateBook);
    } catch (error) {
        return next(setError(404, 'It was not possible to modify this book.'));
    }
}

//metodo para eliminar en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (book.image) deleteImgCloudinary(book.image);
        return res.status(200).json(book);
    } catch (error) {
        return next(setError(404, 'It was not possible to delete this book.'));
    } 
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}