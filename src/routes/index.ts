import express from 'express'
import userRoute from './user/users.route'
import authRoute from './auth/auth.route'
import roomRoute from './room/room.route'

const route = express()
route.use('/', userRoute)
route.use('/auth', authRoute)
route.use('/', roomRoute)

export default route
