const {
    Router
} = require('express');
const router = Router();

/*Importar el controlador */
const {
    getUsuarios,
    crearUsuarios,
    crearUsuario,
    getUsuario,
    eliminarUsuario,
    actualizarUsuario
} = require('../controladores/usuarios.controlador');


router.route('/')
    // res.send o res.json
    .get(getUsuarios)
    .post(crearUsuarios);

//.put, .delete .patch

router.route('/:id')
    .get(getUsuario)
    .post(crearUsuario)
    .put(actualizarUsuario)
    .delete(eliminarUsuario);
// .delete((req, res) => res.json({
//     mensaje: 'Usuario eliminado' + req.params.id
// }));

module.exports = router;