import express from 'express'
import { errorHandler } from './common/error/error'
import route from './routes'
import cors from 'cors'
import path from 'path'
import './database/associations'
import './libs/discord-bot'
import dotenv from 'dotenv'
import './jobs'

dotenv.config()

const app = express()

// Setup CORS options
const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Middleware for parsing request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
const dirname = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../', '/src') : __dirname
app.use('/storage', express.static(path.join(dirname, 'public/storage')))

// Simple route to confirm server is running
app.get('/', (req, res) => {
  res.send('Welcome to the static file server')
})

// Routes and error handler
app.use(route)
app.use(errorHandler)

export default app
