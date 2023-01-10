const { get, post, put, deleteById } = require('../test/cliente.js')

const main = async() => {
    console.log("-- Trae todos los productos --")
    const getProductos = await get()
    console.log(getProductos.data)

    console.log("-- Agregar un producto --")
    const postProductos = await post({"cod":"001", "nombre": "Heladera","precio": "180000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_734540-MLA44628265442_012021-F.webp"})
    console.log(postProductos.data)

    console.log("-- Actualizar un producto --")
    const xproducto = await get()
    const putProductos = await put(parseInt(xproducto.data[xproducto.data.length - 1].id),{"cod":"002", "nombre": "Heladera","precio": "150000", "foto": "https://http2.mlstatic.com/D_NQ_NP_2X_686897-MLA32557197254_102019-F.webp"})
    console.log(putProductos.data)
    
    console.log("-- Eliminar un producto --")
    const yproducto = await get()
    const deleteProductos = await deleteById(parseInt(yproducto.data[yproducto.data.length - 1].id))
    console.log(deleteProductos.data)
}

main()