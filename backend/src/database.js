const cors = require('cors');
const mongoose = require('mongoose');
/*Acceder a la String de conexión con MongoDB Atlas del archivo .env */
const db_uri = process.env.DATABASE_URI;

/*Usar mongoose para conectar a MongoDB, pasandole la url del server de la base de datos */
mongoose.connect(db_uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
/* Una vez la conexión ha sido realizada: */
const conexion = mongoose.connection;
conexion.once('open', () => {
    console.log("La Base de datos está conectada");
});