//importamos mongoose y bcrypt para encriptar nuestras contraseñas
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//importamos formateo de errores
const { setError } = require('../../utils/error/error');

//importamos nuestros validadores:
const { validationPassword, validationEmail } = require('../../utils/validators/validators');

//configuramos esquema del user
const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    userName: { type: String, trim: true, require: true },
    birthday: { type: String, trim: true, require: true }
});

//método mongoose para guardar poder encriptar y guardar las contraseñas
userSchema.pre("save", function(next){
    if (!validationPassword(this.password)) {
        return next(setError(404, 'This password is not valid. The password must contained lowercase, uppercase, number and symbol. The length must be between 8 and 12 caracther.'));
    }
    if (!validationEmail(this.email)) {
        return next(setError(404, 'This email is not valid.'));
    }
    //método bcrypt para encriptar la contraseña hashSync, param1 qué param2 nº saltos de encriptación
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

//configuramos User
const User = mongoose.model('users', userSchema);
//exportamos
module.exports = User;