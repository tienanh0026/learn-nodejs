import userRoute from './routes/user/users.route'
import database from './services/database/database'
import express from 'express'
import './services/database/associations'
import authRoute from './routes/auth/auth.route'

const port = 3002

const app = express()
app.use(express.json())
app.use('/', userRoute)
app.use('/auth', authRoute)
database
  .authenticate()
  .then(async () => {
    app.listen(port, () => {
      console.log('Server is running on http://localhost:' + port)
    })
    console.log('Data Source has been initialized!')
  })
  .catch((error) => console.log(error))
