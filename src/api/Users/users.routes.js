//importamos las rutas y nuestros controladores
const UserRoutes = require('express').Router();
const { register, login, logout } = require('./users.controller');
//importamos la autenticación
const { isAuth } = require('../../middlewares/auth.middleware');


//ejecutamos nuestros endpoints
UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
    //para hacer el logout primero comprobamos que el user este logado
    //para eso creamos un middleware
UserRoutes.post('/logout', [isAuth], logout);

//exportamos
module.exports = UserRoutes;