/*usando mongoose para modelar nuestros datos */
const {
    Schema,
    model
} = require('mongoose');

const modeloVideojuego = new Schema({
    titulo: {
        type: String,
        required: true
    },
    titulo_original: String,
    categoria: String,
    contenido: String,
    plataformas: Array,
    companias: Array,
    rutaImg: {
        type: String
    },
    cloudImg: {
        type: String
    },
    cloudImg_segura: {
        type: String
    },
    formato: {
        type: String
    },
    ancho: Number,
    alto: Number,
    idImg: {
        type: String
    },
    puntuacion: Number,
    fecha: {
        type: Date,
        default: Date.now
    },
    meta: {
        votos: Number,
        favs: Number
    }

}, {
    timestamps: true
});

module.exports = model('mVideojuego', modeloVideojuego);