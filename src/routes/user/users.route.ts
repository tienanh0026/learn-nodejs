import { UserController as UserControllerClass } from '@/controllers/user/user.controller'
import { UserService as UserServiceClass } from '@/services/user/user.service'
import express from 'express'

const userRoute = express()
const UserService = new UserServiceClass()
const UserController = new UserControllerClass(UserService)
userRoute.get('/users', UserController.findAll)
userRoute.post('/users', UserController.create)
userRoute.get('/user/', UserController.findByEmail)

// userRoute.post('/users', UserController.createUser)

export default userRoute
