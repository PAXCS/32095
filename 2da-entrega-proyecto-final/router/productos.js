import express from "express";
const { Router } = express

//const productosApi = require("../daos/index.js")
import { productosDao as productosApi } from "../daos/index.js";

const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true })) 

const esAdmin = true;

//ADMIN
function crearErrorNoEsAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
  } else {
    error.descripcion = "no autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
}
//GET

productosRouter.get("/", async (req, res) => {
  const productos = await productosApi.getAll();
  res.json(productos);
});

//GET BY ID
productosRouter.get("/:id", async (req, res) => {
  res.json(await productosApi.get(req.params.id));
});

//POST
productosRouter.post("/", soloAdmins, async (req, res) => {
  res.json(await productosApi.save(req.body));
});

//PUT
productosRouter.put("/:id", soloAdmins, async (req, res) => {
  res.json(await productosApi.update(req.body));
});

//DELETE BY ID
productosRouter.delete("/:id", soloAdmins, async (req, res) => {
  res.json(await productosApi.delete(req.params.id));
});

export default productosRouter