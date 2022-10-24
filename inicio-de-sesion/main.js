const express = require('express')
const app = express()
const PORT = 8080;
const session = require('express-session')
const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
require('dotenv').config();
const User = require('./utils/userSchema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { hashPassword, comparePassword } = require('./utils/hashPassword');
const { Types } = require('mongoose')
const connection = require('./DB/config')
connection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//Session
app.use(session({
    //Base de datos Mongo
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
        mongoOptions,
        retries: 0,
        cookie: {
            maxAge: 60000,   
        }
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true

}))

//Strategyes

//Login
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            const hassPass = user.password
            if (!user || !comparePassword(password, hassPass)) {
                console.log('Usuario no encontrado o password invalido')
                return done(null, false)
            } else {
                console.log('user:', user)
                return done(null, user)
            }

        }
        catch (error) {
            done(error)
        }

    }
))

//Singup
passport.use("signup", new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
        return done(null, false)

    }

    const hashedPassword = hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return done(null, newUser);
}));

//Serializer
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    // console.log('user deserializado', user)
    done(null, user);
});

//Inicializacion passport
app.use(passport.initialize());
app.use(passport.session())

//Motor Ejs
app.use(express.static('public'));
app.set('view engine', 'ejs')

//Routers
const ruta = require('./routers/rutas')
app.use('/', ruta)
ruta.use(express.static('public'));

//Server ON
app.listen(PORT, () => {
    console.log(`Servidor Online Puerto ${PORT}`)
}) 