import productosApi from '../../api/productos.js'

async function manejarEnvíoDeProductos() {
    try {
        const productos = await productosApi.listarAll();
        return productos
    } catch (error) {
        return []
    }
}

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await manejarEnvíoDeProductos());

    socket.on('update', async producto => {
        try {
            await productosApi.guardar(producto)
        } catch (error) {
           return "error al guardar producto"

        }

        sockets.emit('productos', await manejarEnvíoDeProductos());
    })
}