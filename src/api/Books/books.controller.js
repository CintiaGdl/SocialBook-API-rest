const Book = require('./books.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

const { setError } = require('../../utils/error/error');

const getAll = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        return next(setError(404, 'It was not possible to get all books.'))
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        return next(setError(404, 'It was not possible to get this book.'))  
    } 
}

const postOne = async (req, res, next) => {
    try {
        const book = new Book(req.body);
        if (req.file) book.image = req.file.path;
        const bookDB = await book.save();
        return res.status(201).json(bookDB);
    } catch (error) {
        return next(setError(404, 'It was not possible to create a new book.'))
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = new Book(req.body);
        if (req.file) book.image = req.file.path;
        book._id = id;
        const updateBook = await Book.findByIdAndUpdate(id, book);
        return res.status(200).json(updateBook);
    } catch (error) {
        return next(setError(404, 'It was not possible to modify this book.'));
    }
}

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