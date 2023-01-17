require('dotenv').config()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../utils/schemas/schema')
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const logger = require('../loggerConfig')
const {enviarWA} = require('../utils/twilio');
const {enviarMail} = require('../utils/nodemailer');


passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const { nombre, direccion, edad, foto, ordenes } = req.body
    const usuario = await User.findOne({ email });
    if (usuario) {
        logger.log('warn', 'Usuario existente')
        return done(null, false, { message: "Usuario existente" })

    }
    const telefonoRegistrado= process.env.TELEFONO
    const hashedPassword = hashPassword(password)
    const newUser = new User({
        email,
        password: hashedPassword,
        nombre: nombre,
        direccion: direccion,
        edad: edad,
        telefono: telefonoRegistrado,
        foto: foto,
        ordenes: ordenes
    })
    await newUser.save();
    
    enviarMail(newUser.email)
    enviarWA(newUser.email)
    return done(null, newUser)

}))


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    try {
        const usuario = await User.findOne({ email });
        const hassPass = usuario.password
        if (!usuario || !comparePassword(password, hassPass)) {
            return done(null, null, logger.log('warn', "Usuario no encontrado o password invalido"))
        }
        return done(null, usuario, logger.log('info', `Logueado Correctamente ${usuario.email}`))

    } catch (error) {
        return done(error)
    }
}
))

passport.serializeUser((user, done) => {
    done(null, user.email)
})
passport.deserializeUser(async (email, done) => {
    const usuario = await User.findOne({email} )
    done(null, usuario)
})