const moongose = require ('mongoose');

async function connection() {

    const URLstring = `mongodb+srv://cpax:lpPbv8sf78PHOzbi@cluster0.2qm6piw.mongodb.net/myFirstDatabase?appName=mongosh+1.6.0`

    const ruta = await moongose.connect(URLstring)
    return ruta
}

module.exports = connection