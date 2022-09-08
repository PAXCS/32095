const express = require("express")
const app = express()
const port = process.env.PORT || 8080

const productosRouter = require('./router/productos')
const carritoRouter = require('./router/carrito')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.use(function (req, res, next) {
    res.status(404).send({
      error: -1,
      descripcion: `Ruta ${req.url}, metodo ${req.method} no autorizada`,
    });
});

app.get("/", (req, res) => {
    if (req.query.admin === "admin") {
      res.send("Bienvenido a la API de productos como admin");
    } else {
      res.send("Bienvenido a la API de productos");
    }
});

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });

server.on("error", error => console.log(`Error ${error} en servidor `))