const mongoose = require('mongoose');
require('dotenv').config()

const connection = async () => {
    const URLstring = process.env.DATABASE;
    await mongoose.connect(URLstring)

}
module.exports = connection