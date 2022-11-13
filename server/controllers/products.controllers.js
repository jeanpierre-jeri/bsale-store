import { pool } from '../db/connection.db.js'

export const getAllProducts = async (req, res) => {
  const { name = '', order = 'category', category = '' } = req.query

  const orderTypes = ['category', 'name', 'price']

  const searchName = `%${name}%`

  let categoryQuery = ''
  if (category) {
    categoryQuery = 'AND category = :category'
  }

  let orderTerm = pool.escapeId(order)
  let orderDirection = 'ASC'

  if (order.includes(':')) {
    const [orderName, ascOrDesc] = order.split(':')

    if (!orderTypes.includes(orderName)) {
      return res.status(400).json({
        message: `Invalid order term ${orderTerm}`,
        validOrderTerms: orderTypes
      })
    }

    orderTerm = pool.escapeId(orderName)
    if (ascOrDesc === 'desc') {
      orderDirection = 'DESC'
    }
  }

  try {
    const [result] = await pool.query(
      `SELECT * 
      FROM product 
      WHERE name LIKE :name
      ${categoryQuery}
      ORDER BY ${orderTerm} ${orderDirection}`,
      { name: searchName, category }
    )

    if (!result.length) {
      return res.status(404).json({ status: 'NOT_FOUND', message: 'No products found' })
    }

    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const getAllCategories = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM category`)

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
