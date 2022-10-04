import express from "express";
const app = express();
const port = process.env.PORT || 8080

import productosRouter from "../2da-entrega-proyecto-final/router/productos.js";
import carritosRouter from "../2da-entrega-proyecto-final/router/carrito.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended : true }))

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritosRouter)


const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));