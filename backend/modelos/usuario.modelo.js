const {
    Schema,
    model
} = require('mongoose');

const modeloUsuario = new Schema({
    nombre: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    puntuacion: Number

}, {
    timestamps: true
});

module.exports = model('mUsuario', modeloUsuario);