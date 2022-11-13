const express = require('express');
const app = express();
const PORT = 8080;
const logger = require('./loggerConfig');
const compression = require('compression')
const zip = compression()

app.get('/', (req, res) => {
    logger.log('info', `Ruta ${req.url}`)
    res.send("Loggers, Gzip y Performance");

});
app.get('/infogzip', zip, (req, res) => {
    logger.log('info', 'Ruta exitosa');

    res.send({   'directorio': process.cwd(),
    'id proceso': process.pid,
    'version node': process.version,
    'titulo': process.title,
    'sistema operativo': process.platform,
    'uso memoria': process.memoryUsage()}
    )
})
app.get('/info', (req, res) => {
    logger.log('info', 'Ruta exitosa');

    res.send({   'directorio': process.cwd(),
    'id proceso': process.pid,
    'version node': process.version,
    'titulo': process.title,
    'sistema operativo': process.platform,
    'uso memoria': process.memoryUsage()}
    )
})
app.get('/*', (req, res) => {
    logger.log("warn", `Ruta no encontrada ${req.url}`)
    res.status(400).send(`Ruta no encontrada ${req.url}`);
})

app.listen(PORT, () => {
    console.log(`Bienvenido, servidor online puerto: ${PORT}`)
})