const knexLib = require('knex');

//Cliente

class ClienteSQL {
    constructor(config){
        this.knex = knexLib(config)
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('productos').finally(()=> {
            return this.knex.schema.createTable("productos", table =>{
                table.increments("id").primary();
                //table.thumbnail("thumbnail");
                table.string("nombre", 15).notNullable();
                table.string("codigo", 10).notNullable();
                table.float("precio");
                table.integer("stock");
            })
        })
    }
 
    insertarProductos(productos){
        return this.knex("productos").insert(productos)
    }

    listarProductos() {
        return this.knex('productos').select('*')
      }
    
      borrarProductosPorId(id) {
        return this.knex.from('productos').where('id', id).del()
      }
    
      actualizarStockPorId(stock, id) {
        return this.knex.from('productos').where('id', id).update({ stock: stock })
      }
    
      close() {
        this.knex.destroy();
      }
    }
    
    module.exports = ClienteSQL