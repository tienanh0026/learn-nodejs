import { Sequelize } from 'sequelize'
import dbConfig from './configs'

const sequelizeConnection: Sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST, // Public IP of your Cloud SQL instance
  dialect: 'mysql',
  port: 3306, // Default MySQL port
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Depending on your SSL configuration
    }
  },
  logging: false
  // host: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME
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
