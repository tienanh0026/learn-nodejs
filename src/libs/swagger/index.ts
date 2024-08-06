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
    servers: [
      {
        url: 'http://localhost:8080/',
        description: 'Local server'
      },
      {
        url: '<your live url here>',
        description: 'Live server'
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./router/*/*.ts']
}
const swaggerSpec = swaggerJsdoc(options)

export { swaggerSpec }
