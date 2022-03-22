//configuramos nuestra función para formatear errores sin tener que repetir tantas líneas
const setError = (code, message) => {
    const error = new Error;
    error.code = code;
    error.message = message;
    return error;
};

module.exports = { setError };