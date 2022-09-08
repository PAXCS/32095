const express = require('express')
const { Router } = express

const ProductoApi = require('../api/productos')
const prods = './contenedor/productos.json'

const product = new ProductoApi(prods)
const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

const noAdmin = {
    error: -1,
    mensaje: "Necesitas permisos de administrador para realizar esta acción"
}

//GET
productosRouter.get("/", async (req, res) => {
    let data = await product.getAll();
    res.send(data);
  });

//GET
productosRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let data = await product.getById(id);
    res.send(data);
  });

//POST
productosRouter.post("/", async (req, res) => {
    await product.save(req.body);
      let nombreProduct = req.body.nombre;
      res.send(`Se guardo el producto ${nombreProduct}`);
      
    /* if (req.query.admin === "admin") {
      await product.save(req.body);
      let nombreProduct = req.body.nombre;
      res.send(`Se guardo el producto ${nombreProduct}`);
    } */
    //res.send(noAdmin);
  });

//POST
productosRouter.put("/:id", async (req, res) => {
    if (req.query.admin === "admin") {
      await product.update(req.params.id, req.body);
      res.send("Producto actualizado con exito");
    }
    res.send(noAdmin);
  });

//DELETE
productosRouter.delete("/:id", async (req, res) => {
    if (req.query.admin === "admin") {
      let data = await product.getAll();
      let newData = data.filter((x) => {
        return x.id != req.params.id;
      });
      await product.deleteById(newData);
      res.send("se elimino correctamente el producto");
    }
    res.send(noAdmin);
  });

module.exports = productosRouter