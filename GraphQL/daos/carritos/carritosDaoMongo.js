const ContenedorMongoDB = require("../../contenedores/contenedorMongdb");

const {carritos} = require('../../utils/schemas/schema')

class CarritosDaoMongo extends ContenedorMongoDB {

    constructor() {
        super(carritos)
    }  


}
module.exports = CarritosDaoMongo