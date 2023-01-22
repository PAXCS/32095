const crypto=require('crypto')

class Product{
    constructor(id,{nombre,precio,descripcion,categoria,foto,stock}){
        this.id=id
        this.nombre=nombre
        this.precio=precio
        this.descripcion=descripcion
        this.categoria=categoria
        this.foto=foto
        this.stock=stock
    }
}

const ProductsContainer=[]


const getProduct = ({id})=>{
    if(!ProductsContainer[id]){
        throw new Error('Product not found')
    }
    return ProductsContainer[id]
}

const getProducts = ()=>{
    const product=Object.values(ProductsContainer)

     return product
}

const createProduct = ({data})=>{
    const id=crypto.randomBytes(10).toString('hex')
    const newProduct=new Product(id,data)
    ProductsContainer[id]=newProduct
    return newProduct   
}

const updateProduct = ({id,data})=>{
    console.log(ProductsContainer[id])
    if(!ProductsContainer[id]){
        throw new Error('Product not found')
    }
    const updateProduct=new Product(id,data)
    ProductsContainer[id]=updateProduct
    return updateProduct
}

const deleteProduct = ({id})=>{
    if(!ProductsContainer[id]){
        throw new Error('Product not found')
    }
    const deletedProduct=ProductsContainer[id]
    delete ProductsContainer[id]
    return deletedProduct
}

module.exports={
    Product,
    ProductsContainer,
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}