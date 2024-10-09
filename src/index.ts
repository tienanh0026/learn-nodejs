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
  origin: 'http://localhost:3001', // Set your frontend origin explicitly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Enable credentials for cross-origin requests
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

// const createUnixSocketPool = async (config) => {
//   // Note: Saving credentials in environment variables is convenient, but not
//   // secure - consider a more secure solution such as
//   // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
//   // keep secrets safe.
//   return mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
//     // Specify additional properties here.
//     ...config
//   })
// }

server.listen(port, () => {
  console.log('Server is running on http://localhost:' + port)
  sequelizeConnection
    .authenticate()
    .then(async () => {
      console.log('Data Source has been initialized!')
    })
    .catch((error) => console.log(error))
})
