import express from 'express'
import { errorHandler } from './common/error/error'
import sequelizeConnection from './database/connection'
import route from './routes'
import './database/associations'
import { Server } from 'socket.io'
import http from 'http'
import { socketMiddleware } from './libs/socket/middleware'
import cors from 'cors'
const port = 3002

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(socket)
})

io.use(socketMiddleware)

app.use(
  cors({
    origin: '*', // Or use '*' to allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  })
)

app.use(express.json())
app.use(express.urlencoded())
app.use(route)
app.use(errorHandler)

sequelizeConnection
  .authenticate()
  .then(async () => {
    app.listen(port, () => {
      console.log('Server is running on http://localhost:' + port)
    })
    console.log('Data Source has been initialized!')
  })
  .catch((error) => console.log(error))
