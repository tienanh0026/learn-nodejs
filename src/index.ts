import userRoute from './routes/user/users.route'
import express from 'express'
import authRoute from './routes/auth/auth.route'
import { errorHandler } from './common/error/error'
import sequelizeConnection from './database/connection'

const port = 3002

const app = express()
app.use(express.json())
app.use('/', userRoute)
app.use('/auth', authRoute)
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
