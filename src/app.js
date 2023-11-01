const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const whiteList = ['https://leafy-loops-089483.netlify.app', 'http://localhost:8080/users']; 


const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1){
        callback(null, true);
    } else {
        callback(new Error('not allow by CORS'));
    }
}
}

app.use(cors(corsOptions));

app.use(router);
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
