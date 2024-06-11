/* eslint-disable no-undef */
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  DB_DATABASE: process.env.DB_NAME || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_USERNAME: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || ''
}

export default dbConfig
