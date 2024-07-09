import { Sequelize } from 'sequelize'
import dbConfig from './configs'

const sequelizeConnection: Sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: 'mysql',
  port: 3306
})

console.log({
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_DATABASE,
  host: dbConfig.DB_HOST,
  dialect: 'mysql',
  port: 3306
})

export default sequelizeConnection
