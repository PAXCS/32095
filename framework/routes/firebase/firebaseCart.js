const express = require('express');
const { Router } = express;

const CarritoFirebase = require('../../daos/carritos/CarritosDaoFirebase')

const firebaseCarrito = new Router();
firebaseCarrito.use(express.json());
firebaseCarrito.use(express.urlencoded({ extended: true }));

const cart = new CarritoFirebase

//Routes
//Getall
firebaseCarrito.get('/', async (req, res) => {

    const getAll = await cart.getAll()
    res.json(getAll)

})

//GetbyId
firebaseCarrito.get("/:id", async (req, res) => {
    const id = req.params.id;
    const getById = await cart.getById(id)
    res.json(getById)
})

//Insert
firebaseCarrito.post('/', async (req, res) => {

    
    const item = req.body
        
    const insertar = await cart.insert(item);
    res.json(insertar)

})

//Update
firebaseCarrito.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body
    const item = {
        nombre: nombre,
        precio: precio
    }
    const insertar = await cart.actualizar(id, item);
    res.json(insertar)
})

//Delete
firebaseCarrito.delete('/:id', async (req, res) => {

    const id = req.params.id
    const eliminar = await cart.eliminar(id);
    res.json(eliminar)

})

module.exports = firebaseCarrito