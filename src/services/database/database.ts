import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
dotenv.config()

const dbName = process.env.DB_NAME || ''
const dbHost = process.env.DB_HOST || ''
const dbUser = process.env.DB_USER || ''
const dbPassword = process.env.DB_PASSWORD || ''

const database = new Sequelize({
  dialect: 'mysql',
  host: dbHost,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  logging: true
})

//only run when create table
database.sync()

export default database
