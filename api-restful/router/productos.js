const express = require('express')
const { Router } = express
const ProductosApi = require('../api/productos')

const productosApi = new ProductosApi()

const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))


productosRouter.get('/', (req, res) => {
    res.json(productosApi.getAll(req.params.id))
})

productosRouter.get('/:id', (req, res) => {
    res.json(productosApi.get(req.params.id))
})

productosRouter.post('/', (req, res) => {
    res.json(productosApi.save(req.body))
})

productosRouter.put('/:id', (req, res) => {
    res.json(productosApi.update(req.body, req.params.id))
})

productosRouter.delete('/:id', (req, res) => {
    res.json(productosApi.delete(req.params.id))
})

module.exports = productosRouter