import { Sequelize } from 'sequelize'
import dbConfig from './configs'

const sequelizeConnection: Sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: 'mysql',
  port: 3306
})

export default sequelizeConnection
