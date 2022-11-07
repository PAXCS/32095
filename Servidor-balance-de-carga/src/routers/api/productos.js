import { Router } from 'express'
import { createNFakeProducts } from '../../mocks/productos.js'

const productosApiRouter = new Router()

productosApiRouter.get('/productos-test', (req, res, next) => {
    try {
        res.json(createNFakeProducts(5))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default productosApiRouter