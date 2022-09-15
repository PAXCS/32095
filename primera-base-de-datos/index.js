const express = require('express');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

//import ContenedorSQL from './contenedores/ContenedorSQL.js'
const ContenedorSQL = require ('./contenedores/ContenedorSQL.js');

const sql3 = require ('./DB/SQLite3.js');
//import sql3 from './DB/SQLite3.js'
//import options from './options/mariaDB.js'
const options = require ('./options/mariaDB.js');


//Servidor, Socket, Api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(options.mariaDB, 'productos')
const mensajesApi = new ContenedorSQL(sql3.sqlite3, 'mensajes')

//Socket

io.on('connection', async socket =>{
    console.log('Nuevo cliente conectado');

    socket.emit('productos', productosApi.getAll())

    socket.on('update', producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', productosApi.getAll());
    })

    socket.emit('mensajes', await mensajesApi.getAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        mensaje.likes = 0
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.getAll());
    })

    socket.on("eventLike", async (msgId)=>{
        const msg = await mensajesApi.get(msgId)
        msg.likes ++
        await mensajesApi.update(msgId , msg)
        socket.emit("update", "se actualizaron los mensajes")
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on("error", error => console.log(`Error ${error} en servidor `))
