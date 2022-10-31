const express = require('express')
const app = express()
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

const parseArgs = require('minimist');

const opciones = {
    alias: {
        p: "puerto",
    },

    default: {
        puerto: 8080,

    }
}

const objeto = parseArgs(process.argv.slice(2), opciones);


//---------------------------Session-----------------------//
app.use(session({
//----------------------Base de datos Mongo----------------//
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

//---------------------------Strategyes-----------------------//

//------------------------------Login-------------------------//
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

//---------------------------Singup-------------------------//
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

//------------------------Serializer-----------------------//
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});

//--------------------------Passport-----------------------//
app.use(passport.initialize());
app.use(passport.session())

//-------------------------Motor Ejs-----------------------//
app.use(express.static('public'));
app.set('view engine', 'ejs')

//-------------------------Routers-------------------------//
const ruta = require('./routers/rutas')
app.use('/', ruta)
ruta.use(express.static('public'));

//-----------------------Router info-----------------------//
app.get('/info', (req, res) => {
    res.send({
        'directorio': process.cwd(),
        'id proceso': process.pid,
        'version node': process.version,
        'titulo': process.title,
        'sistema operativo': process.platform,
        'uso memoria': process.memoryUsage()
    })

})

//-------------------------randoms--------------------------//
const { fork } = require('child_process')
app.get('/api/randoms', (req, res) => {
    const cant = req.query.cant || 100000000
    const child = fork('./child.js')
    child.send(cant)
    child.on('message', result => {
        res.send({result})
    })
})

//----------------------------Server ON-------------------//
app.listen(objeto.p, () => {
    console.log(`Servidor Online Puerto ${objeto.p}`)
}) 