const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
    nombre:{type: String, required: true},
    direccion:{type: String, required: true},
    edad:{type: Number, required: true},
    telefono:{type: Number, required: true},
    foto:{type: String, required: true},
    ordenes:{type:Array, default:{message: "No tiene ordenes generadas"}}
})

const User = model('usuarios', userSchema)

module.exports ={
    User, userSchema
}