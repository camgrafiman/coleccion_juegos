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
    categoria: String,
    contenido: String,
    plataformas: Array,
    companias: Array,
    rutaImg: {
        type: String,
        required: true
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