import express from 'express'
import userRoute from './user/users.route'
import authRoute from './auth/auth.route'
import roomRoute from './room/room.route'
import messageRoute from './message/message.route'
import subscriptionRoute from './subscription/subscription.route'
import uploadFileRoute from './upload/upload.route'

const route = express()
route.use('/', userRoute)
route.use('/auth', authRoute)
route.use('/room', roomRoute)
route.use('/', messageRoute)
route.use('/', subscriptionRoute)
route.use('/', uploadFileRoute)

export default route
