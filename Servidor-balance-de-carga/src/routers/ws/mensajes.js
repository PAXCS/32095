import mensajesApi from '../../api/mensajes.js'
import { normalizarMensajes } from '../../normalizacion/index.js'

async function manejarEnvíoDeMensajes() {
    try {
        const mensajes = await mensajesApi.listarAll()
        return normalizarMensajes(mensajes)
    } catch (error) {
        return []
    }
}

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', await manejarEnvíoDeMensajes());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        sockets.emit('mensajes', await manejarEnvíoDeMensajes());
    })
}