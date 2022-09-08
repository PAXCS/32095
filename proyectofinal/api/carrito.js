const { promises: fs } = require('fs')

const Contenedor = require("../api/productos");
const product = new Contenedor("./contenedor/productos.json");

//AGREGAR DATOS
const setData = async (file, prod) => {
    try {
        await fs.writeFile(file, JSON.stringify(prod, null, 2));
    } catch (err) {
        console.log(err);
    }
};

//OBTENER DATOS
const obtData = async (file) => {
    try {
        const readFile = await fs.readFile(file, "utf-8");
        if (readFile.length) return await JSON.parse(readFile);
        else return readFile;
    } catch (err) {
        console.log("no se pueden obtener datos", err);
    }
};

//FECHA Y HORA
const today = new Date(Date.now()).toLocaleString();

class CarritoApi {
    constructor(ruta) {
      this.ruta = ruta;
    }

    //MÉTODOS
    save = async (objeto) => {
        let data = await obtData(this.ruta);
        const id = data.length + 1
        await setData(this.ruta, [
        ...data,
        { id: id, timeStamp: today, producto: [objeto] },
        ]);
    };

    getById = async (id) => {
        let data = await obtData(this.ruta);
        if (data) {
        return await data.find((item) => item.id === id);
        } else {
        throw new Error(`no existe el id ${id}`);
        }
    };

    getAll = async () => {
        return await obtData(this.ruta);
    };
    deleteById = async (objeto) => {
        await setData(this.ruta, [...objeto]);
    };

    addToCart = async (id, objeto) => {
        let data = await obtData(this.ruta);
        let index = id - 1;
        data[index].producto.push(objeto);
        await setData(this.ruta, [...data]);
    };

    deleteFromCart = async (id, idProd) => {
        let data = await obtData(this.ruta);
        let index = id - 1;
        let dataCart = data[index].producto;
        let dataAdd = dataCart.filter((item) => item.id !== idProd);
        data[index].producto = dataAdd;
        await setData(this.ruta, [...data]);
        console.log(dataAdd);
    };
}

module.exports = CarritoApi;