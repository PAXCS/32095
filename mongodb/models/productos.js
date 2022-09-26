const mongoose = require('mongoose');

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    nombre: {type: String},
    codigo: {type: String},
    precio: {type: Number},
    stock: {type: Number}
})

const productos = mongoose.model(productosCollection, productosSchema);

module.exports = productos;