//importamos libreria jsonwebtoken
const jwt = require('jsonwebtoken');

//configuramos la generación de token y verificación o por función o clase
//x clase:
class JwtUtils {
    //JWT_SECRET hay que crear nuestra variable de entorno en el archivo .env
    //para que se genere el token a través del archivo .env con una contraseña complicada
    //coger una de un generador de contraseñas
    static generateToken(id, email) {
        //expiresIn indica cuando el token dejará de ser valido
        return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = JwtUtils;