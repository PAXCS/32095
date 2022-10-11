const express = require('express');
const app = express();

const { Server: HTTPserver, get } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HTTPserver(app);
const socketServer = new IOServer(httpServer)

const port = process.env.PORT || 8080

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', 'C:\Users\Dell\Documents\GitHub\32095\mocks-y-normalizacion\public\views\pages\vista.ejs');
app.set('view engine', 'ejs');

const productos= require('./routes/productos')

const {save, verMsj} = require("./controllers/mensajes")
app.use('/productos', productos)
  

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html")
})

socketServer.on('connection', async (socket) => {
    console.log('conectado al servidor')
    socket.on("chat_message", (msj)=> {
        save(msj)
        socketServer.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024
    console.log(getAllPesoOriginal)

    socketServer.sockets.emit('MENSAJES_EXISTENTES', getAll)
    socketServer.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})

httpServer.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`);
  });
  httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));