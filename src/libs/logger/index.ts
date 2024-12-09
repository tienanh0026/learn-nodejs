import winston from 'winston'
import path from 'path'

const logDirectory = path.join(__dirname, '..', 'logs') // Relative path to 'logs' folder

// Ensure the 'logs' directory exists
import fs from 'fs'
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true })
}

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'errors.log') }) // Using the relative log path
  ]
})

export { logger }
