import express from 'express'
import userRoute from './user/users.route'
import authRoute from './auth/auth.route'
import roomRoute from './room/room.route'
import messageRoute from './message/message.route'

const route = express()
route.use('/', userRoute).use('/auth', authRoute).use('/', roomRoute).use('/', messageRoute)

export default route
