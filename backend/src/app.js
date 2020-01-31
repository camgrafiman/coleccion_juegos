const express = require('express');
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


//rutas:
app.use('/api/usuarios', require('../rutas/usuarios'));
app.use('/api/videojuegos', require('../rutas/videojuegos'));



/* --------------------- */
/* exportar */
module.exports = app;