//importamos mongoose
const mongoose = require('mongoose');
//creamos SCHEMA es el método mediante el cual vamos a definir nuestro modelo de datos
const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true},
        birthdate: { type: String, required: false, trim: true},
        image: { type: String, trim: true, required: false },
        books : [{ type: mongoose.Schema.Types.ObjectId, ref: "books", required: true }]
    },
    {
        timestamps: true,
    }
)

const Author = mongoose.model('author', authorSchema);
//exportamos
module.exports = Author;