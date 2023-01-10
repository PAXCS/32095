const { assert } = require('assert').strict
const { get, post, put, deleteById } = require('../test/cliente')

const { assert } = require('chai')
const { get, post, put, deleteById } = require('../test/cliente')

describe('Test MOCHA', function () {

  it('GET: Obtiene todos los productos. RETORNO: Status 200; array', async function () {
    const { status, data } = await get()
    assert.equal(status, 200)
    assert.equal(typeof(data), 'array')
  })

  it('POST: Producto nuevo. RETORNO: status 200; Objeto + ID', async function () {
    const { status, data } = await post({"cod":"001", "nombre": "Heladera","precio": "180000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_734540-MLA44628265442_012021-F.webp"})
    assert.equal(status, 200)
    assert.equal(typeof(data), 'Objeto')
    assert.equal(JSON.stringify(data), JSON.stringify({ id: parseInt(data.id) }))
  })

  it('PUT: Producto por su ID. RETORNO: status 200; objeto con respuesta exitosa', async function () {
    const xproducto = await get()
    const { status, data } = await put(parseInt(xproducto.data[xproducto.data.length - 1].id),{"cod":"002", "nombre": "Heladera","precio": "150000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_686897-MLA32557197254_102019-F.webp"})
    assert.equal(status, 200)
    assert.equal(typeof(data), 'Objeto')
    assert.equal(JSON.stringify(data), JSON.stringify({retorno: 'Info correctamente actualizada'}))
  })

  it('DELETE: Elimina produto por su ID, RETORNO: status 200; un objeto con respuesta exitosa', async function () {
    const yjugador = await get()
    const { status, data } = await deleteById(parseInt(yjugador.data[yjugador.data.length - 1].id))
    assert.equal(status, 200)
    assert.equal(typeof(data), 'Objeto')
    assert.equal(JSON.stringify(data), JSON.stringify({ respuesta: 'Producto eliminado correctamente' }))
  })

})