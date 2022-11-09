import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routerProducts from './routes/products.routes.js'

dotenv.config()

const app = express()
app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use('/api/products', routerProducts)

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
