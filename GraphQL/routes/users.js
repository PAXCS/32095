const express = require('express');
const { Router } = express
const users = Router()

const passport = require('passport')
const auth = require('../middleware/auth')

users.post('/signup', passport.authenticate("signup", { session: false }), (req, res) => {
    res.send('Registro exitoso')
})


users.post("/login", passport.authenticate('login', { failureRedirect: '/users/error'}), (req, res) => {
    const user = req.user
    req.session.user = user.email
    req.session.telefono = user.telefono
    console.log("user",req.session.user, req.session.telefono)
    res.redirect('/users/profile')
   
})
users.get('/profile', auth, (req, res) => {
    const user = req.user
    req.session.user = user.email
    
    res.send({ message: `Bienvenido a su perfil nombre:${user.nombre}, email: ${user.email}, telefono:${user.telefono}, direccion: ${user.direccion}, ordenes: ${JSON.stringify(user.ordenes)}` })
})

users.get('/logout', auth, (req, res) => {
    req.session.destroy();
    req.logout(() => {
        res.send("deslogueado exitosamente")
    })
})

module.exports = users