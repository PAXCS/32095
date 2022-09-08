const { promises: fs } = require('fs')

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
  
class ProductosApi {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //MÉTODOS
    save = async (objeto) => {
        let data = await obtData(this.ruta);
        const id = data.length + 1
        await setData(this.ruta, [
        ...data,
        { id: id, timeStamp: today, ...objeto },
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
  
    async update(id, prod) {
        let data = await obtData(this.ruta);
        let i;
        data.find((el, index) => {
        if (el.id == id) {
          i = index;
          return i;
        }
    });
  
        data[i].nombre = prod.nombre;
        data[i].descripcion = prod.descripcion;
        data[i].codigo = prod.codigo;
        data[i].foto = prod.foto;
        data[i].precio = prod.precio;
        data[i].stock = prod.stock;
        console.log(data);
        await setData(this.ruta, data);
    }

    deleteById = async (objeto) => {
        await setData(this.ruta, [...objeto]);
    };

    deleteAll = async () => {
        await setData(this.ruta, []);
    };
}
  
module.exports = ProductosApi;