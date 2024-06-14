import express from 'express'
import { errorHandler } from './common/error/error'
import sequelizeConnection from './database/connection'
import route from './routes'
import './database/associations'

const port = 3002

const app = express()
app.use(express.json())
app.use(route)
app.use(() => {
  console.log('ádasd')
})
app.use(errorHandler)

sequelizeConnection
  .authenticate()
  .then(async () => {
    app.listen(port, () => {
      console.log('Server is running on http://localhost:' + port)
    })
    console.log('Data Source has been initialized!')
  })
  .catch((error) => console.log(error))
