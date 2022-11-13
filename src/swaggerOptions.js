export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bsale API',
      version: '1.0.0',
      description: 'A simple API for Bsale products'
    },
    servers: [
      {
        url: 'https://bsale-store-production.up.railway.app/api'
      },
      {
        url: 'http://localhost:4000/api'
      }
    ]
  },
  apis: ['src/routes/*.js']
}
