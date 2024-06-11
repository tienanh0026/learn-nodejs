/* eslint-disable no-undef */
require('ts-node/register')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configs = require('./configs.ts')

console.log(configs.default)

module.exports = {
  username: configs.default.DB_USERNAME,
  password: configs.default.DB_PASSWORD,
  database: configs.default.DB_DATABASE,
  host: configs.DB_HOST,
  dialect: 'mysql',
  port: 3306
}
