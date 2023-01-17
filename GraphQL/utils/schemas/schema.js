const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
    nombre:{type: String, required: true},
    direccion:{type: String, required: true},
    edad:{type: Number, required: true},
    telefono:{type: Number, required: true},
    foto:{type: String, required: true},
    ordenes:{type:Array, default:{message: "No tiene ordenes generadas"}},
    carrito: { type: Schema.Types.ObjectId, ref: 'Cart' }
})

const cartSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    productos: {type: Array}
})

const User = model('usuarios', userSchema)
const Cart= model('carritos', cartSchema)

module.exports ={
    User, userSchema, Cart, cartSchema
}