import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import cors from 'cors'

// Swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions.js'

import routerProducts from './routes/products.routes.js'
import { PORT } from '../env.js'

const app = express()
app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use('/api', routerProducts)
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(options)))
app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
