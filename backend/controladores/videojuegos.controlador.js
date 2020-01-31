const vgControl = {};

/*Traer el modelo: */
const mVideojuego = require('../modelos/videojuego.modelo');


/* PLURAL */
vgControl.getVideojuegos = async (req, res) => {
    const listaVideojuegos = await mVideojuego.find();

    res.json({
        listaVideojuegos
    });
};

vgControl.crearVideojuegos = async (req, res) => {
    const {
        titulo,
        categorias,
        plataformas,
        companias,
        rutaImg,
        puntuacion,
        fecha
    } = req.body;
    const nuevoVideojuego = new mVideojuego({
        titulo: titulo,
        categorias: categorias,
        plataformas: plataformas,
        companias: companias,
        rutaImg: rutaImg,
        puntuacion: puntuacion,
        fecha: fecha

    });
    /*Guardar en la base de datos: */
    await nuevoVideojuego.save();
    res.json({
        mensaje: "Videojuego n: " + req.params.id + " añadido!"
    });
};



/* SINGULAR */

vgControl.getVideojuego = async (req, res) => {
    /*pasarle el id unico para coger los datos de un único item */
    const videojuego = await mVideojuego.findById(req.params.id);
    res.json(videojuego);
};

vgControl.crearVideojuego = async (req, res) => {
    const {
        titulo,
        categorias,
        plataformas,
        companias,
        rutaImg,
        puntuacion,
        fecha
    } = req.body;
    const nuevoVideojuego = new mVideojuego({
        titulo: titulo,
        categorias: categorias,
        plataformas: plataformas,
        companias: companias,
        rutaImg: rutaImg,
        puntuacion: puntuacion,
        fecha: fecha

    });
    /*Guardar en la base de datos: */
    await nuevoVideojuego.save();
    res.json({
        mensaje: "Videojuego n: " + req.params.id + " añadido!"
    });
};


vgControl.actualizarVideojuego = async (req, res) => {
    /* Destructuring: */
    const {
        titulo,
        categorias,
        contenido,
        plataformas,
        companias,
        rutaImg,
        puntuacion,
        fecha
    } = req.body;
    await mVideojuego.findOneAndUpdate(req.params.id, {
        titulo: titulo,
        categorias: categorias,
        contenido: contenido,
        plataformas: plataformas,
        companias: companias,
        rutaImg: rutaImg,
        puntuacion: puntuacion,
        fecha: fecha
    });
    res.json({
        mensaje: "Videojuego: " + req.params.id + " | " + titulo + "  ha sido actualizado"
    });
};

vgControl.borrarVideojuego = async (req, res) => {
    /*Eliminar item pasandole el id */
    const videojuegoElim = await mVideojuego.findByIdAndDelete(req.params.id);
    res.json({
        mensaje: "Videojuego " + req.params.id + " ha sido eliminado"
    });
};




module.exports = vgControl;