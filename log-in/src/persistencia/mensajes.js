//CAPA DE SERVICIO
import config from '../config.js'

import ContenedorArchivo from '../negocio/ContenedorArchivo.js'

const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

export default mensajesApi