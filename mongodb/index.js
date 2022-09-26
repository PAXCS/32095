const mongoose = require("mongoose");
const mensajes = require("./models/mensajes");
const productos = require("./models/productos");

const URL = 'mongodb://localhost:27017/ecommerce'

CRUD();

async function CRUD() {
    try {
        const connection = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");

        console.log("CREATE PRODUCTOS");
        const producto = [
            {nombre: "Tablet", codigo: "0001", precio:"1200", stock:"80"},
            {nombre: "Ereader", codigo: "0002", precio:"3500", stock:"100"},
            {nombre: "Mouse", codigo: "0003", precio:"570", stock:"75"},
            {nombre: "Notebook", codigo: "0004", precio:"4200", stock:"50"},
            {nombre: "Smartphone", codigo: "0005", precio:"4600", stock:"100"},
            {nombre: "Headset", codigo: "0006", precio:"2400", stock:"40"},
            {nombre: "Teclado", codigo: "0007", precio:"600", stock:"120"},
            {nombre: "Router USB", codigo: "0008", precio:"800", stock:"20"},
            {nombre: "Cooler XV", codigo: "0009", precio:"2800", stock:"20"},
            {nombre: "Monitor", codigo: "0010", precio:"4800", stock:"10"}
        ]
        //GUARDA LOS 10 PRODUCTOS SOLICITADOS
        /*  await producto.forEach((item)=>{
            const schemaProducto = new productos(item);
            schemaProducto.save();

        }) */

        //INSERTAR UN PRODUCTO EN LA COLLECTION
        /* console.log("INSERT ONE");
        const productoNuevo = {nombre: "VR visor", codigo: "0011", precio:"2300", stock:"15"};
        const schemaProducto = new productos(productoNuevo);
        const savedProducto = await schemaProducto.save();
        console.log(savedProducto); */

        //MUESTRA EL LISTADO DE LOS PRODUCTOS DE LA COLLECTION
        console.log("READ PRODUCTOS");
        const listaProductos = await productos.find({});
        console.log(listaProductos);

        //LISTAR PRODUCTOS CON PRECIO MENOR A 1000 PESOS
        const menorMilPesos = await productos.find({precio:{$lt:1000}});
        console.log("Productos con precios menores a 1000 pesos "+ menorMilPesos);

        //LISTAR PRODUCTOS CON PRECIO ENTRE LOS 1000 A 3000 PESOS
        const precioEntre = await productos.find({$and: [{precio:{$gte:1000}},{precio:{$lte:3000}}]});
        console.log("Productos con precios entre 1000 y 3000 pesos "+ precioEntre);

        //LISTAR PRODUCTOS CON PRECIO MAYOR A 3000 PESOS
        const mayorTresMilPesos = await productos.find({precio:{$gte:3000}});
        console.log("Productos con precios mayores a 3000 pesos "+ mayorTresMilPesos);

        //CONSULTA QUE TRAIGA EL NOMBRE DEL TERCER PRODUCTO MAS BARATO
        const newArr = await productos.find().sort({precio:-1, precio:1})
        const tercerPos = newArr[2].nombre
        console.log("Tercer producto más barato "+ tercerPos);
        
        //HACER UNA ACTUALIZACION SOBRE TODOS LOS PRODUCTOS AGREGANDO 100 A STOCK
        const updateProductos = await productos.update(
            {$set:{stock: 100}}
        )
        console.log(updateProductos);

        //CAMBIAR EL STOCK A CERO DE LOS PRODUCTOS CON PRECIOS MAYORES A 4000 PESOS
        const updateProductosMayores = await productos.update(
           {precio:{$gte:4000}}, {$set:{stock:0}}
        )
        console.log(updateProductosMayores);

        //BORRAR LOS PRODUCTOS CON PRECIO MENOR A 1000 PESOS
        const deleteProductosMenores = await productos.deleteMany(
            {precio:{$lt:1000}}
        )
        console.log(deleteProductosMenores);

        console.log("CREATE MENSAJES");
        const mensaje = [
            {autor: "micorreo1@micorreo.com", texto: "Me faltaron los mouses", fyh: "18/9/2022 10:55:29"},
            {autor: "micorreo2@micorreo.com", texto: "Cuánto cuesta el teclado gamer?", fyh: "19/9/2022 19:00:21"},
            {autor: "micorreo3a@micorreo.com", texto: "Estoy llamando desde temprano y no atiende nadie", fyh: "20/9/2022 12:30:10"},
            {autor: "micorreo4@micorreo.com", texto: "Tienen celulares marca Kinowa?", fyh: "21/9/2022 09:32:27"},
            {autor: "micorreo5@micorreo.com", texto: "So porveedor de accesorios para setup, les interesa?", fyh: "21/9/2022 11:07:24"},
            {autor: "micorreo6@micorreo.com", texto: "Aceptan mercado pago?", fyh: "22/9/2022 13:32:52"},
            {autor: "pmicorreo7@micorreo.com", texto: "Qué horario tienen?", fyh: "22/9/2022 17:00:47"},
            {autor: "micorreo8@micorreo.com", texto: "Paso el lunes a retirar el el pedido a nombre de Franco Escaramilla", fyh: "23/9/2022 16:45:18"},
            {autor: "micorreo9@micorreo.com", texto: "El viernes feriado abren medio día?", fyh: "24/9/2022 18:30:02"},
            {autor: "micorreo10@micorreo.com", texto: "Gracias por la pronta respuesta!", fyh: "25/9/2022 20:34:17"}
        ]
        //GUARDA LOS 10 MENSAJES SOLICITADOS
        /* await mensaje.forEach((item)=>{
            const schemaMensaje = new mensajes(item);
            schemaMensaje.save();

        }) */

        //MUESTRA EL LISTADO DE LOS MENSAJES DE LA COLLECTION
        console.log("READ MENSAJES");
        const listaMensajes = await mensajes.find({});
        console.log(listaMensajes);
 

    } catch (error) {
        console.log("Connection error");
    }
}