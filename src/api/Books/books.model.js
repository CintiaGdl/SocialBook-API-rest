//importamos mongoose
const mongoose = require('mongoose');
//creamos SCHEMA es el método mediante el cual vamos a definir nuestro modelo de datos
const bookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true},
        description: { type: String, required: false, trim: true},
        bookLaunch: { type: String, required: false, trim: true},
        tags: { type: String, required: false, trim: true },
        image: { type: String, trim: true, required: false }
    },
    {
        timestamps: true,
    }
)

//guardamos la asana y el schema, asanas es el nombre de mi colección en la DB
const Book = mongoose.model('books', bookSchema);
//exportamos
module.exports = Book;