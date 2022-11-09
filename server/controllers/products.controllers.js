import { pool } from '../db/connection.db.js'

export const getAllProducts = async (req, res) => {
  const { name = '', order = 'category', category = '' } = req.query

  const searchName = `%${name}%`

  let categoryQuery = ''
  if (category) {
    categoryQuery = 'AND category = :category'
  }

  let orderTerm = pool.escapeId(order)
  let orderDirection = 'ASC'

  if (order.includes(':')) {
    const [orderName, ascOrDesc] = order.split(':')

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

    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
