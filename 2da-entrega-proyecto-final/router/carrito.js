import express from "express";
const { Router } = express

//import ProductosApi from "../api/productos.js";

import { carritosDao as carritosApi } from '../daos/index.js';

const carritosRouter = new Router()

//GET ALL
carritosRouter.get("/", async (req, res) => {
  res.json((await carritosApi.getAll()).map((c) => c.id));
});

//POST
carritosRouter.post("/", async (req, res) => {
    res.json(await carritosApi.save()`El carrito se creo correctamente`);
  });

//DELETE
carritosRouter.delete("/:id", async (req, res) => {
    res.json(await carritosApi.delete(req.params.id) + "se elimino correctamente el producto");
  });

//PRODUCTOS EN CARRITO

//GET
carritosRouter.get("/:id/productos", async (req, res) => {
  const carrito = await carritosApi.get(req.params.id)
  res.json(carrito.productos)
  });

//POST
carritosRouter.post("/:id/productos", async (req, res) => {
  const carrito = await carritosApi.get(req.params.id)
  const producto = await productosApi.get(req.body.id)
  carrito.productos.push(producto);
  await carritosApi.update(carrito)
  res.end(`se agrego nuevo producto al carrito`);
  });

//DELETE
carritosRouter.delete("/:id/productos/:idProd", async (req, res) => {
  const carrito = await carritosApi.get(req.params.id)
  const index = carrito.productos.findIndex((p)=> p.id == req.params.idProd)
  if (index != -1) {
    carrito.productos.splice(index, 1)
    await carritosApi.update(carrito)
  }
  res.end(`se elimino del carrito Id Nº ${id} el producto Id Nº ${idProd} `)
  });

export default carritosRouter