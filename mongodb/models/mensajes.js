const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    autor: {type: String},
    texto: {type: String, max: 120},
    fyh: {type: String}
})

const mensajes = mongoose.model(mensajesCollection, mensajesSchema);

module.exports = mensajes;