import { swaggerSpec } from '@/libs/swagger'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
const swaggerRoute = express()

swaggerRoute.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
swaggerRoute.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

export default swaggerRoute
