import { Sequelize } from 'sequelize'
import dbConfig from './configs'
import mysql, { PoolConfig } from 'promise-mysql'

const sequelizeConnection: Sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  dialect: 'mysql',
  host: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    socketPath: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME, // Use the Unix socket path
    connectTimeout: 60000, // 60 seconds
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const createUnixSocketPool = async (config: PoolConfig) => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  return mysql.createPool({
    user: dbConfig.DB_USERNAME, // e.g. 'my-db-user'
    password: dbConfig.DB_PASSWORD, // e.g. 'my-db-password'
    database: dbConfig.DB_DATABASE, // e.g. 'my-database'
    socketPath: '/cloudsql/' + dbConfig.DB_CLOUD_SQL_CONNECTION_NAME, // e.g. '/cloudsql/project:region:instance'
    // Specify additional properties here.
    ...config
  })
}

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
