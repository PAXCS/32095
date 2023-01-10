import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';
import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'
import ContenedorSQL from '../../contenedores/ContenedorSQL.js'

import { PERSISTENCIA_PRODUCTOS, RUTA_PRODUCTOS } from '../../config.js'

import config from '../../config.js'

let productosDao
switch (PERSISTENCIA_PRODUCTOS) {
    case 'FILE':
        productosDao = new ContenedorArchivo(RUTA_PRODUCTOS)
        break
    case 'SQL':
        productosDao = new ContenedorSQL(config.mariaDb, 'productos')
        break
    default:
        productosDao = new ContenedorMemoria()
}

export function getProductosDao() {
    return productosDao
}