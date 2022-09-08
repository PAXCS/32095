const express = require('express')
const { Router } = express
const carritoRouter = new Router()

const CarritoApi = require('../api/carrito')

const db = './contenedor/carrito.json'

const cart = new CarritoApi(db)

carritoRouter.use(express.json())
carritoRouter.use(express.urlencoded({ extended: true }))

//POST
carritoRouter.post("/", async (req, res) => {
    await cart.save(req.body);
    let id = parseInt(req.body.id);
    res.send(`Carrito id: Nº ${id}, se creo correctamente`);
  });

//DELETE
carritoRouter.delete("/:id", async (req, res) => {
    let data = await cart.getAll();
    let newData = data.filter((x) => {
      return x.id != req.params.id;
    });
    await cart.deleteById(newData);
    res.send("se elimino correctamente el producto");
  });

//GET
carritoRouter.get("/:id/productos", async (req, res) => {
    let id = parseInt(req.params.id);
    let data = await cart.getById(id);
    res.send(data);
  });

//POST
carritoRouter.post("/:id/productos", async (req, res) => {
    let id = parseInt(req.params.id);
    await cart.addToCart(id, req.body);
    res.send(`se agrego nuevo producto al carrito Id Nº ${id}`);
  });

//DELETE
carritoRouter.delete("/:id/productos/:idProd", async (req, res) => {
    let id = parseInt(req.params.id);
    let idProd = parseInt(req.params.idProd);
    await cart.deleteFromCart(id, idProd);
    res.send(`se elimino del carrito Id Nº ${id} el producto Id Nº ${idProd} `);
  });

module.exports = carritoRouter