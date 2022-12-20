import dotenv from 'dotenv'
import parseArgs from 'minimist'
import {cpus} from 'os'
const numCPUs = cpus().length

dotenv.config()

const argv = parseArgs(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode',
        a: 'auth'
    },
    default: {
        port: 8080,
        mode: 'FORK',
        auth: 'NO_AUTH',
        NODE_ENV: 'PROD'
    }
})

const sessionConfig = {
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
};

function getSpecs() {
    return {
        env: { description: 'entorno de ejecucion', value: argv.NODE_ENV },
        puerto: { description: 'puerto', value: argv.port },
        modo: { description: 'modo', value: argv.mode },
        argumentos: { description: 'argumentos de entrada', value: process.argv.slice(2).join(', ') },
        plataforma: { description: 'plataforma', value: process.platform },
        versionNode: { description: 'version de node', value: process.version },
        memoriaReservada: { description: 'memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
        rutaEjecucion: { description: 'path de ejecucion del entorno', value: process.execPath },
        idProceso: { description: 'id de proceso', value: process.pid },
        directorioProyecto: { description: 'path del proyecto', value: process.cwd() },
        numeroProcesadores: {description:'Nro de Procesadores', value: numCPUs }
    }
}

export const PERSISTENCIA_MENSAJES = argv.NODE_ENV == 'PROD' ? 'MONGO' : 'FILE'
export const RUTA_MENSAJES = './DB/mensajes.json'

export const PERSISTENCIA_PRODUCTOS = argv.NODE_ENV == 'PROD' ? 'MONGO' : 'FILE'
export const RUTA_PRODUCTOS = './DB/productos.json'

export default {
    getSpecs,
    NODE_ENV: argv.NODE_ENV,
    PORT: argv.port,
    mode: argv.mode,
    auth: argv.auth,
    session: sessionConfig,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: process.env.DATABASE
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE3
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: process.env.MYSQL
    },
    fileSystem: {
        path: process.env.FILESYSTEM
    },
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
}