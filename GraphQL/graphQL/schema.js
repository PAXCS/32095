const { buildSchema } = require("graphql");

const {
    ProductType,
    newProductInput,
    getAllProds,
    getProdById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("./Products");



const Schema = buildSchema(`
  ${ProductType}
  ${newProductInput}
type Query{
  ${getAllProds}
  ${getProdById}
 
}
type Mutation{
  ${createProduct},
  ${updateProduct},
  ${deleteProduct},
  
} 
`);

module.exports = Schema;