const connection = require("../db/mongo");
const mongoose = require('mongoose')
/* const  normalizarM = require("./normalizr.js");
const normalizr = require("./normalizr.js"); */

const { normalize, schema, desnormalize } = require('normalizr')

const author = new schema.Entity('authors')

const mensaje = new schema.Entity('mensajes', {
    author: author
}, {idAttribute: '_id'})


const normalizar = (data) => {
    let allMessages = data.map(msg => {return {...msg._doc, _id: msg._id.toString()}})
    const _normalized = normalize(allMessages, [mensaje])
    return _normalized
}

try {
    connection()
    console.log("Conectado a MongoDB")

} catch (error) {
    console.log(error)
}

const mongooseSchema = new mongoose.Schema({
    author: {
        id: { type: String, required: true, max: 100 },
        nombre: { type: String, required: true, max: 100 },
        apellido: { type: String, required: true, max: 50 },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true, max: 100 },
        /* timestamp: { type: Date, default: Date.now().toLocaleString()} */
    },
    text: { type: String, required: true, max: 400 }
});

const msjModel = mongoose.model('mensajes', mongooseSchema);

const save = async (msj) => {
    const newMsj = msjModel(msj)
    try {
        newMsj.save()
    } catch (error) {
        console.log(error)
        
    }
}

const verMsj = async () => {
    const getAll = await msjModel.find()
    const normalizado = normalizar(getAll)
    return normalizado

}
module.exports = {
    verMsj,
    save,
}