import { Router } from 'express'

import { getAllProducts, getAllCategories } from '../controllers/products.controllers.js'

const router = Router()

router.get('/products', getAllProducts)
router.get('/categories', getAllCategories)

export default router
