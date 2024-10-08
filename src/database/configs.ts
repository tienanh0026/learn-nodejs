/* eslint-disable no-undef */
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  DB_DATABASE: process.env.DB_NAME || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_USERNAME: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_CLOUD_SQL_CONNECTION_NAME: process.env.DB_CLOUD_SQL_CONNECTION_NAME || ''
}

export default dbConfig
