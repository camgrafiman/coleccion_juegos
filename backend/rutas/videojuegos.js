/*importar el uploader multer */
const cargaMulter = require('../src/multerConfiguracion');
/*Multer será usado como middleware en los métodos post/put para subir las imágenes de los videojuegos en este caso. */
/*Importar configuración de cloudinary para la subida de archivos */
const cloudinary = require('../src/cloudinaryConfiguracion');

const {
    Router
} = require('express');
const router = Router();

const {
    getVideojuegos,
    crearVideojuegos,
    borrarVideojuegos,
    getVideojuego,
    crearVideojuego,
    actualizarVideojuego,
    borrarVideojuego
} = require('../controladores/videojuegos.controlador');


router.route('/')
    .get(getVideojuegos)
    .post(cargaMulter, crearVideojuegos)
    .delete(borrarVideojuegos);
    

router.route('/:id')
    .get(getVideojuego)
    .post(crearVideojuego)
    .put(cargaMulter, actualizarVideojuego)
    .delete(borrarVideojuego);

module.exports = router;