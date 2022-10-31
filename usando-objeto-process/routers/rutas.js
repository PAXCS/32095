const express = require('express');
const { Router } = express;
const auth = require('../middleware/auth')
const passport = require('passport')

const ruta = new Router()

//-----------------------------Routers------------------------//
ruta.post("/login", passport.authenticate('login', { failureRedirect: '/nocredentials' }), (req, res) => {
    req.session.user = req.user
    
    res.redirect('/profile')
})

ruta.post("/signup", passport.authenticate("signup", { successRedirect: '/singupExitoso', failureRedirect: "/userexistente" }), (req, res) => {

    res.redirect("/singupExitoso")
});

ruta.get('/profile', auth, (req, res) => {
    res.render('./pages/profile', {
        user: req.user
    })
})

ruta.get('/signup', (req, res) => {
    
    res.sendFile('/singup.html', {root:'public'})
})

ruta.get('/singupExitoso', (req, res) => {
    res.render('./pages/signupExitoso')

});

//-----------------------------------Errores-------------------------//
ruta.get('/userexistente', (req, res) => {
    res.render('./pages/noCredentials', { error: 'Correo electronico ya existente' })

});
ruta.get('/nocredentials', (req, res) =>{
    res.render('./pages/noCredentials', { error: 'Correo o password invalidos' })
});

//------------------------------------Logout-------------------------//
ruta.get("/logout", (req, res) => {
    req.session.destroy();
    req.logout(() => {
        res.render('./pages/logout')
    })
});

module.exports= ruta