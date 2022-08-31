const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('./contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorMemoria()
const mensajesApi = new ContenedorArchivo('mensajes.json')

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