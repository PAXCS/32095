import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("carritos.json");
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

export default CarritosDaoArchivo;