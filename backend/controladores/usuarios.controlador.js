const usuariosControl = {};

/*Importar el modelo: */
const mUsuario = require('../modelos/usuario.modelo');

usuariosControl.getUsuarios = async (req, res) => {
    /*Buscar todos los usuarios */
    const usuarios = await mUsuario.find(); // Array de todos los usuarios: [{},{},{}]
    res.json(usuarios);
};

usuariosControl.crearUsuarios = async (req, res) => {
    console.log(req.body); // es el json que se envia al servidor
    const {
        nombre,
        email,
        password,
        puntuacion
    } = req.body;
    const nuevoUsuario = new mUsuario({
        nombre: nombre,
        email: email,
        password: password,
        puntuacion: puntuacion || 0
    });
    console.log(nuevoUsuario);
    /* Guardar en la base de datos: */
    await nuevoUsuario.save();
    res.json({
        mensaje: "Usuario creado!"
    });
};


usuariosControl.crearUsuario = async (req, res) => {
    console.log(req.body); // es el json que se envia al servidor
    const {
        nombre,
        email,
        password,
        puntuacion
    } = req.body;
    const nuevoUsuario = new mUsuario({
        nombre: nombre,
        email: email,
        password: password,
        puntuacion: puntuacion || 0
    });
    console.log(nuevoUsuario);
    /* Guardar en la base de datos: */
    await nuevoUsuario.save();
    res.json({
        mensaje: "Usuario creado!"
    });
};

usuariosControl.getUsuario = async (req, res) => {
    const usuario = await mUsuario.findById(req.params.id);
    res.json(usuario);
};

usuariosControl.actualizarUsuario = async (req, res) => {
    const {
        nombre,
        email,
        password,
        puntuacion
    } = req.body;
    await mUsuario.findOneAndUpdate(req.params.id, {
        email,
        password,
        puntuacion
    });
    res.json({
        mensaje: "Usuario id: " + req.params.id + nombre + " ha sido actualizado"
    });
};

usuariosControl.eliminarUsuario = async (req, res) => {
    await mUsuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario ' + req.params.id + ' ha sido eliminado' });
};



module.exports = usuariosControl;