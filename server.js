const express = require("express")
const app = express()

const productosRouter = require('./router/productos')

app.use(express.static('public'))
app.use('/api/productos', productosRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))