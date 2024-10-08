import { Sequelize } from 'sequelize'
import dbConfig from './configs'

const sequelizeConnection: Sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME, // Use the Unix socket path
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
})

console.log({
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_DATABASE,
  // host: dbConfig.DB_HOST,
  dialect: 'mysql',
  port: 3306,
  host: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME
})

export default sequelizeConnection
