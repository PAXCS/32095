import knexLib from 'knex'

//Cliente

class ClienteSQL3 {
    constructor(config){
        this.knex = knexLib(config)
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('mensajes').finally(()=> {
            return this.knex.schema.createTable("mensajes", table =>{
                table.increments("id").primary();
                table.string("autor", 15).notNullable();
                table.string("texto", 10),notNullable();
                table.float("fyh");
            })
        })
    }
 
    insertarMensajes(mensajes){
        return this.knex("mensajes").insert(mensajes)
    }

    listarMensajes() {
        return this.knex('productos').select('*')
      }
    
      close() {
        this.knex.destroy();
      }
    }
    
    export default ClienteSQL3