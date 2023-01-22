const ProductType = `
type Product{
    id: ID!
    nombre: String
    precio: Int
    descripcion: String
    foto: String
    stock: Int
}
`;
const newProductInput = `
    input ProductInput{
    id: ID!
    nombre: String
    precio: Int
    descripcion: String
    foto: String
    stock: Int
    }
`;
const getAllProds = `
    getProducts: [Product]
`;

const getProdById = `
    getProduct(id: ID!): Product
`;

const createProduct = `
    createProduct(data: ProductInput): Product
`;

const updateProduct = `
    updateProduct(id: ID!, data:ProductInput): Product
`;

const deleteProduct = `
    deleteProduct(id: ID!): Product
`;

module.exports = {
  ProductType,
  newProductInput,
  getAllProds,
  getProdById,
  createProduct,
  updateProduct,
  deleteProduct,
};