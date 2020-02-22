const express = require('express');
/*Body Parser: es un nodo middleware para el handling json, raw, textos y url encoded form data*/
const bodyParser = require('body-parser');

const multer = require('multer');
/*Path: acceso a Carpeta de proyecto  */
const path = require('path');

const app = express();
const cors = require('cors');



// configuración del servidor:
/* puerto en el que queremos conectar el servidor */
const puerto = process.env.PORT || 4000;
app.set('port', puerto);

//middlewares (se ejecutan antes de que llegue la info a las rutas) por ejemplo cors:
/*Usar cors y json */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Aqui doy los permisos a la app para tener acceso a las carpetas estáticas como css, imágenes, etc */
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subidas', express.static('subidas'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// // HANDLING CORS ERRORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if (req.method === 'OPTIONS') {
//         res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
//         return res.status(200).json({})
//     } next();
// });
// //HANDLE ERROR
// app.use((req, res, next) => {
//     const error = new Error('ERROR: --NO ENCONTRADO--')
//     error.status = 404
//     next(error)
// })
// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     res.json({ error: { message: error.message } })
// })
// const cargaMulter = require('./multerConfiguracion');

// app.post('/api/videojuegos/up', cargaMulter, (req, res) => {
//     console.log('req file: ', req.file);
//     res.json(req.file);
// });

//rutas:
app.use('/api/usuarios', require('../rutas/usuarios'));
app.use('/api/videojuegos', require('../rutas/videojuegos'));




/* --------------------- */
/* exportar */
module.exports = app;