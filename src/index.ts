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
import dotenv from 'dotenv'
import './jobs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
dotenv.config()

const argv = yargs(hideBin(process.argv))
  .option('port', {
    type: 'number',
    description: 'Port to run the server on'
  })
  .parseSync()

const port = argv.port || process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

initSocket(server)

// initWebsocket(server)

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
const dirname = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../', '/src') : __dirname

app.use('/storage', express.static(path.join(dirname, 'public/storage')))

app.get('/', (req, res) => {
  res.send('Welcome to the static file server')
})

// app.get('/livestream', (req, res) => {
//   const filePath = path.join(__dirname, 'output.webm')
//   fs.stat(filePath, (err, stats) => {
//     if (err) {
//       res.status(404).send('File not found')
//       return
//     }
//     res.writeHead(200, {
//       'Content-Type': 'video/webm',
//       'Content-Length': stats.size
//     })
//     const readStream = fs.createReadStream(filePath)
//     readStream.pipe(res)
//   })
// })
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
