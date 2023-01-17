const express = require("express");
const app = express();
const PORT = 8080;

const { graphqlHTTP } = require("express-graphql");
const schema = require("./GraphQl/schema");
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../GraphQL/graphQL/Products");

//MongoDB
const { connection } = require("../GraphQL/DB/config");
connection;

//Firebase
const { dbFirebase } = require("../GraphQL/DB/config");
dbFirebase;

//Routes MongoDB
const mongoProductos = require("./routes/Mongo/mongoProds");
const mongoCarritos = require("./routes/Mongo/mongoCart");

app.use("/mongoproductos", mongoProductos);
app.use("/mongocarritos", mongoCarritos);
app.use("/graphql",
  graphqlHTTP({
    schema,
    rootValue: {
      getProduct,
      getProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

//Routes Firebase
/* const firebaseProductos = require("./routes/Firebase/firebaseProds");
const firebaseCarrito = require("./routes/Firebase/firebaseCart");
const { connect } = require("mongoose");

app.use("/firebaseproductos", firebaseProductos);
app.use("/firebasecarritos", firebaseCarrito);
 */
//Servidor Online

app.listen(PORT, () => {
    console.log(`Servidor Online puerto ${PORT}`);
});