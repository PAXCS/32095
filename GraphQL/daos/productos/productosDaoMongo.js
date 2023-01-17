const ContenedorMongoDB = require("../../contenedores/contenedorMongdb");

const {productos} = require('../../utils/schemas/schema')

class ProductosDaoMongo extends ContenedorMongoDB {

    constructor() {
        super(productos)
    }
}
module.exports = ProductosDaoMongo