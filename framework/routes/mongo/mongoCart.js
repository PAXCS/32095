const express = require('express');
const { Router } = express;

const mongoCarritos = new Router()
mongoCarritos.use(express.json());
mongoCarritos.use(express.urlencoded({ extended: true }));

const { carritos } = require('../../schemas/schemas')
const CarritosDaoMongo = require('../../daos/carritos/CarritosDaoMongo')
const carts = new CarritosDaoMongo;

// //CARRITOS
mongoCarritos.get('/', async (req, res) => {

    const getAll = await carts.getAll()
    res.send(getAll)

});
//Get by Id
mongoCarritos.get('/:id', async (req, res) => {
    const id = req.params.id
    const filtrado = await carts.getById(id)
    res.json(filtrado)

})
//insertar producto
mongoCarritos.post('/', async (req, res) => {
    const {
        productos

    } = req.body



    const newItem = new carritos({
        productos: productos
    })
    const result = await carts.insertar(newItem)
    res.json(result)

})

//Actualizar
mongoCarritos.put('/:id', async (req, res) => {
    const id = req.params.id
    const filter = { _id: id }

    const { productos } = req.body

    const updItem = {
        productos: productos
    }

    const result = await prods.actualizar(filter, updItem);
    console.log(result)
    res.json(result)

})
//Eliminar 
mongoCarritos.delete('/:id', async (req, res) => {
    const id = req.params.id
    const resultado = await carts.eliminar(id);
    res.json(resultado)

})
module.exports = mongoCarritos