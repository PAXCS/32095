require('dotenv').config()

const express = require('express')
const { Router } = express
const ordenes = Router()
const { enviarSMS} = require('../utils/twilio');
const auth = require('../middleware/auth')
const {enviarMailOrden} = require('../utils/nodemailer')

ordenes.post('/', auth, (req, res) => {
    const body = req.body
    const orden = {
        email: req.session.user,
        telefono: req.session.telefono,
        orden: body
    }
    enviarMailOrden(JSON.stringify(orden))
    enviarSMS(req.session.telefono)
    res.send(orden)
})

module.exports = ordenes