import { Options } from 'swagger-jsdoc'
import swaggerJsdoc from 'swagger-jsdoc'
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learn Nodejs',
      description: 'API endpoints for learning Nodejs',
      contact: {
        name: 'Nguyen Tien Anh',
        email: 'tienanh0026@gmail.com',
        url: 'https://www.chelseafc.com/en'
      },
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./src/routes/**/*.swagger.ts']
}
const swaggerSpec = swaggerJsdoc(options)

export { swaggerSpec }
