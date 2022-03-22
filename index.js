const express = require('express');

const cors = require('cors');

const { connect } = require('./src/utils/database/db');

const { configCloudinary } = require('./src/utils/cloudinary/config');

// const documentation = require('./src/utils/documentation/api.json');

const BookRouters = require('./src/api/Books/books.routes');
const AuthorRouters = require('./src/api/Authors/authors.routes');
const UserRoutes = require('./src/api/Users/users.routes');

const PORT = process.env.PORT || 8080;

const app = express();

connect();

configCloudinary();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}));

app.use(express.json({ limit: '5mb' }));

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}))

//cargamos las rutas, volvemos luego cuando estén creados los endpoints
app.use('/api/Books', BookRouters);
app.use('/api/Authors', AuthorRouters);
app.use('/api/Users', UserRoutes);

//documentation de nuestra api
app.use('/api', (req, res, next) => {
    return res.json(documentation);
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

app.use(function (err, req, res, next) {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by');