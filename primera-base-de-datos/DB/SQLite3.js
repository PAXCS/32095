//conexión con file db local funcionando
const path = require('path');

const DBSOURCE = path.join(__dirname, 'ecommerce.sqlite');

const sql3 = {
    client: 'sqlite3',
    connection: {
        filename: DBSOURCE
    },
    useNullAsDefault: true
}

module.exports = sql3