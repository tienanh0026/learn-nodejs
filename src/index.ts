import express from 'express'
import { errorHandler } from './common/error/error'
import sequelizeConnection from './database/connection'
import route from './routes'
import './database/associations'
import http from 'http'
import { socketMiddleware } from './libs/socket/middleware'
import cors from 'cors'
import { getIo, initSocket } from './libs/socket'
import path from 'path'
import './libs/discord-bot'

const port = 3002

const app = express()
const server = http.createServer(app)

initSocket(server)

const io = getIo()
io.use(socketMiddleware)
const corsOptions = {
  origin: '*', // Or specify your frontend origin instead of '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}

app.use(cors(corsOptions))

// Explicitly handle OPTIONS requests
app.options('*', cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/storage', express.static(path.join(__dirname, 'public/storage')))
app.get('/', (req, res) => {
  res.send('Welcome to the static file server')
})
app.use(route)
app.use(errorHandler)

sequelizeConnection
  .authenticate()
  .then(async () => {
    server.listen(port, () => {
      console.log('Server is running on http://localhost:' + port)
    })
    console.log('Data Source has been initialized!')
  })
  .catch((error) => console.log(error))
