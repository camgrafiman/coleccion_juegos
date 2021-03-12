//  importing resolve from path module 
const {
    resolve
} = require('path');
/*Acceder a las variables de entorno. */
require('dotenv').config({
    path: resolve(__dirname, "./dev.env")
});

/* importar el servidor | app */
const app = require('./app');
/*requerir la base de datos: de database.js */
require('./database');


async function principal() {
    await app.listen(app.get('port'));
    console.log(`Servidor en puerto:`, app.get('port'));

}
/* Inicia la App: */
principal();