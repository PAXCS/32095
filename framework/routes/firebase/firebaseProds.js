const express = require('express');
const { Router } = express;

const ProductosFirebase = require('../../daos/productos/ProductosDaoFirebase')

const firebaseProductos = new Router();
firebaseProductos.use(express.json());
firebaseProductos.use(express.urlencoded({ extended: true }));

const prod = new ProductosFirebase

//Routes
//Getall
firebaseProductos.get('/', async (req, res) => {

    const getAll = await prod.getAll()
    res.json(getAll)

})

//GetbyId
firebaseProductos.get("/:id", async (req, res) => {
    const id = req.params.id;
    const getById = await prod.getById(id)
    res.json(getById)
})

//Insert
firebaseProductos.post('/', async (req, res) => {

    const {nombre, precio} = req.body
    const item = {
        nombre:nombre,
        precio:precio
    }
 const insertar = await prod.insert(item);
 res.json(insertar)

})

//Update
firebaseProductos.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {nombre, precio} = req.body
    const item = {
        nombre:nombre,
        precio:precio
    }
 const insertar = await prod.actualizar(id, item);
 res.json(insertar)
})

//Delete
firebaseProductos.delete('/:id', async (req, res) => {

    const id= req.params.id
    const eliminar = await prod.eliminar(id);
    res.json(eliminar)

})

module.exports = firebaseProductos