import UserController from '@/controllers/users'
import express from 'express'

const userRoute = express()

userRoute.get('/users', UserController.getAllUsers)
userRoute.post('/users', UserController.createUser)

export default userRoute
