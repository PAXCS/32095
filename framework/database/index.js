const moongose = require('mongoose');
require('dotenv').config()

async function connection() {

    const URLstring = process.env.DATABASE;

    const ruta = await moongose.connect(URLstring)
    return ruta
}

module.exports = connection;