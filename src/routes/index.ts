import express from 'express'
import userRoute from './user/users.route'
import authRoute from './auth/auth.route'
import roomRoute from './room/room.route'
import messageRoute from './message/message.route'
import subscriptionRoute from './subscription/subscription.route'
import roomUserRoute from './room-user/room-user.route'
import swaggerRoute from './swagger'

const route = express()

route.use('/', userRoute)
route.use('/auth', authRoute)
route.use('/room', roomRoute)
route.use('/', messageRoute)
route.use('/', subscriptionRoute)
route.use('/room', roomUserRoute)
route.use('', swaggerRoute)

export default route
