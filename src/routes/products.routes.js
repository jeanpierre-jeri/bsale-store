import { Router } from 'express'

import { getAllProducts, getAllCategories } from '../controllers/products.controllers.js'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: Object
 *      properties:
 *        id:
 *          type: number
 *          description: The id of the product
 *        name:
 *          type: string
 *          description: The name of the product
 *        url_image:
 *          type: string
 *          description: The url of the image
 *        price:
 *          type: number
 *          description: The price of the product
 *        discount:
 *          type: number
 *          description: The discount
 *        category:
 *          type: number
 *        description: The id of the product category
 *      example:
 *        id: 5
 *        name: ENERGETICA MR BIG
 *        url_image: https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg
 *        price: 1490
 *        discount: 20
 *        category: 1
 *    Category:
 *      type: Object
 *      properties:
 *        id:
 *          type: number
 *          description: The id of the category
 *        name:
 *          type: string
 *        description: The name of the category
 *      example:
 *        id: 1
 *        name: pisco
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Products endpoint
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Returns a list of products
 *    tags: [Products]
 *    parameters:
 *     - name: name
 *       in: query
 *       description: Filter by name
 *       required: false
 *       schema:
 *         type: string
 *     - name: order
 *       in: query
 *       description: By which parameter are you goin to return the array order
 *       required: false
 *       schema:
 *        type: string
 *        default: category
 *        enum:
 *          - category:asc
 *          - category:desc
 *          - name:asc
 *          - name:desc
 *          - price:asc
 *          - price:desc
 *     - name: category
 *       in: query
 *       description: Filter by category
 *       required: false
 *       schema:
 *         type: string
 *    responses:
 *      200:
 *        description: the list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *      400:
 *        description: Order term name not valid
 *      404:
 *        description: No products found
 *      500:
 *        description: Server error
 */

router.get('/products', getAllProducts)

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: Categories endpoint
 */

/**
 * @swagger
 * /categories:
 *  get:
 *    summary: Returns a list of categories
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: the list of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *      500:
 *        description: Server error
 */

router.get('/categories', getAllCategories)

export default router
