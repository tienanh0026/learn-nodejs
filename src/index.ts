import express from 'express'
import { errorHandler } from './common/error/error'
import sequelizeConnection from './database/connection'
import route from './routes'
import './database/associations'
import { Server } from 'socket.io'
import http from 'http'
import { socketMiddleware } from './libs/socket/middleware'

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

app.use(express.json())
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
