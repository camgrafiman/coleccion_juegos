const {
    Router
} = require('express');
const router = Router();

const {
    getVideojuegos,
    crearVideojuegos,
    getVideojuego,
    crearVideojuego,
    actualizarVideojuego,
    borrarVideojuego
} = require('../controladores/videojuegos.controlador');

router.route('/')
    .get(getVideojuegos)
    .post(crearVideojuegos);

router.route('/:id')
    .get(getVideojuego)
    .post(crearVideojuego)
    .put(actualizarVideojuego)
    .delete(borrarVideojuego);

module.exports = router;