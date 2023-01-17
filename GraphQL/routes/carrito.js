require('dotenv').config()

const express = require('express')
const { Router } = express
const carrito = Router()
const {carritos} = require('../utils/schemas/schema')
const cart = new carritos

carrito.get('/', async (req, res) => {


        const response = await carritos.find({})


    res.json(response)



})
module.exports= carrito