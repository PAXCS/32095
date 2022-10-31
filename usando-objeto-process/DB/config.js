const moongose = require('mongoose');


async function connection() {

    const URLstring = "mongodb+srv://cpax:lpPbv8sf78PHOzbi@cluster0.2qm6piw.mongodb.net/myFirstDatabase?appName=mongosh+1.6.0"

    await moongose.connect(URLstring)
}

module.exports = connection;