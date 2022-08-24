const express = require('express')
const {engine} = require("express-handlebars");

const ProductosApi = require('./api/productos.js')

const productosApi = new ProductosApi()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.engine("hbs", engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.post('/productos', (req, res) => {
    const producto = req.body
    productosApi.save(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = productosApi.getAll()

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error ${error} en servidor `))