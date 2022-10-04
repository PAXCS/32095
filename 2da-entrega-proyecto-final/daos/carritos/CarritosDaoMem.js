import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria {

  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CarritosDaoMem;