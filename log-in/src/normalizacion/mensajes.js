import { normalize, schema, } from 'normalizr'

// Se define esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Se define esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Se define esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize({ id: 'mensajes', mensajes: mensajesConId }, schemaMensajes)

export { normalizarMensajes }