//importamos nuestro User y JwtUtils para autentificar el token
const User = require('../api/Users/users.model');
const JwtUtils = require('../utils/jwt/jwt');
//importamos formateo de errores
const { setError } = require('../utils/error/error');

//configuramos nuestra función de autenticación
const isAuth = async (req, res, next) => {
    try {
        // el token siempre se guarda en las cabeceras, así que lo recuperamos de headers
        const token = req.headers.authorization;
        //si no hay token da error
        if (!token) {
            return next(setError(404, 'You need to login.'));
        }
        //en la cabecera el token viene como Bearer TOKEN
        //con el método replace quitamos tanto Bearer como el espacio
        const parsedToken = token.replace('Bearer ', '');
        //verificamos el token
        const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
        const userLogued = await User.findById(validToken.id);
        req.user = userLogued;
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = { isAuth };