//importamos users.model bcrypt y JwtUtils para configurar la lógica de autenticación de user
const User = require('./users.model');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');
//importamos formateo de errores
const { setError } = require('../../utils/error/error');

//importamos la validatioId para poder añadir los favoritos del user
const { validationId } = require('../../utils/validators/validators');

//configuramos la creación del user
const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        //comprobamos si el email existe
        const userExist = await User.findOne({ email: user.email });
        //si existe nos devuelve error
        if (userExist) {
            return next(setError(404, 'This email already exists.'));
        }
        const usernameExist = await User.findOne({ username: user.username });
        if (usernameExist) {
            return next(setError(404, 'This username already exists.'));
        }
        //si no se añade a nuestra DATA BASE
        const userDB = await user.save();
        return res.status(201).json(userDB.name);
    } catch (error) {
        return next(setError(404, 'The register was wrong.'));
    }
};

//configuramos el login
const login = async (req, res, next) => {
    try {
        //comprobamos que existe el email para poder logarse
        const user = await User.findOne({ email: req.body.email });
        //si no da error
        if (!user) {
            return next(setError(404, 'This email is not register.'))
        }
        //verificamos contraseña comparando la contraseña con la hasheada, método compareSync
        if (bcrypt.compareSync(req.body.password, user.password)) {
            // si es correcta generamos el Token
            const token = JwtUtils.generateToken(user._id, user.email);
            // y devolvemos el token al frontal
            return res.status(200).json({ id: user._id, username: user.username , token: token });
        } else {
            return next(setError(404, 'This password is not correct.'))
        }
    } catch (error) {
        return next(setError(404, 'The login was wrong.'));
    }
};

//configuramos el logout
const logout = (req, res, next) => {
    try {
        //eliminamos el token devolviendo null / se mancha
        const token = null;
        return res.status(201).json(token);
    } catch (error) {
        return next(setError(404, 'The logout was wrong.'));
    }
};

//configuramos función para coger datos de nuestro user
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        //necesitamos una función validationId para validar el usuario
        if (validationId(req.headers.user, user)) {
            return next(setError(404, 'This action is not allowed.'))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}


//configuramos la creación añadido de lista favoritos de books
const addFavBookToUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        user.favBooks = [...user.favBooks, ...req.body.favBooks];
        const updateUser = await User.findByIdAndUpdate(user._id, user);
        return res.status(200).json(updateUser);
    } catch (error) {
        return next(setError(404, 'It was not possible add this book to favorite list.'));
    }
}


module.exports = { register, login, logout, addFavBookToUser, getUser };