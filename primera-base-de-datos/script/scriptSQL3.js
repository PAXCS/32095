const ClienteSQL3 = require('../clienteSQL3');

const csql3 = require('../db/SQLite3.js');

const msql3 = new ClienteSQL3(csql3)

console.log(ClienteSQL3);

msql3.crearTabla()
    .then(()=> {
        console.log("a) Tabla creada")

        const mensajes = [
            { id: 1,
              autor: "prueba@micorreo.com",
              texto: "Me faltaron los fideos",
              fyh: "28/8/2022 19:32:29",
              
            },
            { id: 2,
              autor: "cristiansepaz@hotmail.com",
              texto: "Fideo hay uno solo, Y clavo hermosa pepa contra Brasil",
              fyh: "31/8/2022 19:40:16"
              
            }
          ]

        return msql3.insertarMensajes(mensajes)
    })
    .then(()=> {
        console.log("b) Mensajes")
        return msql3.listarMensajes()
    })
    .then(mensajes => {
        console.log("Todos")
        console.table(mensajes)
    })
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
        msql3.close()
    })

