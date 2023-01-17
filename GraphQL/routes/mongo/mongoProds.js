const express = require('express');
const { Router } = express;



const mongoProductos = new Router();
mongoProductos.use(express.json());
mongoProductos.use(express.urlencoded({ extended: true }));

const { productos } = require('../../utils/schemas/schema')
const ProductosDaoMongo = require("../../daos/productos/ProductosDaoMongo");
const prods = new ProductosDaoMongo;



//Productos

//Get All
mongoProductos.get('/', async (req, res) => {

    const getAll = await prods.getAll()
    res.send(getAll)

});
//Get by Id
mongoProductos.get('/:id', async (req, res) => {
    const id = req.params.id
    const filtrado = await prods.getById(id)
    res.json(filtrado)

})
//insertar producto
mongoProductos.post('/', async (req, res) => {
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock

    } = req.body



    const newItem = new productos({
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
    })
    const result = await prods.insertar(newItem)
    res.json(result)

})

//Actualizar
mongoProductos.put('/:id', async (req, res) => {
    const id = req.params.id
    const filter = {_id: id}
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock

    } = req.body

    const updItem = {
        
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
    }

    const result = await prods.actualizar(filter, updItem);
    console.log(result)
    res.json(result)

})
//Eliminar 
mongoProductos.delete('/:id', async (req, res) => {
    const id = req.params.id
    const resultado = await prods.eliminar(id);
    res.json(resultado)

})

module.exports= mongoProductos