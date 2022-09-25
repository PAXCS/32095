const ClienteSQL = require('../clienteSQL');

const options = require("../options/mariaDB");

const mariaSql = new ClienteSQL(options)

mariaSql.crearTabla()
    .then(()=> {
        console.log("a) Tabla creada")

        const productos = [
            {nombre: 'Arroz', codigo: "001", precio: 80, stock: 12},
            {nombre: 'Fideos', codigo: "002", precio: 100, stock: 16},
            {nombre: 'Polenta', codigo: "003", precio: 120, stock: 10}
        ]

        return mariaSql.insertarProductos(productos)
    })
    .then(()=> {
        console.log("b) Productos agregados")
        return mariaSql.listarProductos()
    })
    .then(productos => {
        console.log("c) Producto listado");
        console.table(productos);
        return mariaSql.borrarProductosPorId(1)
    })
    .then(() => {
        console.log("d) Producto borrado")
        return mariaSql.actualizarStockPorId(0, 2)
    })
    .then(() => {
        console.log("e) Stock actualizado")
        return mariaSql.listarProductos()
    })
    .then(productos => {
        console.log("Total")
        console.table(productos)
    })
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
        mariaSql.close()
    })

