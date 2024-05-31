import { UserController as UserControllerClass } from '@/controllers/user/user.controller'
import { UserService as UserServiceClass } from '@/services/user/user.service'
import express from 'express'

const userRoute = express()
const UserService = new UserServiceClass()
const UserController = new UserControllerClass(UserService)
userRoute
  .get('/users', UserController.findAll)
  .post('/user/create', UserController.create)
  .get('/user/', UserController.findByEmail)
  .get('/user/:id', UserController.findById)

export default userRoute
