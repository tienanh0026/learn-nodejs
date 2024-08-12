import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard'
import { UserController as UserControllerClass } from '@/controllers/user/user.controller'
import { JwtService } from '@/libs/jwt/jwt.service'
import { validate } from '@/modules/validation'
import { editUserValidator } from '@/modules/validation/user'
import { UserService as UserServiceClass } from '@/services/user/user.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import express from 'express'

const userRoute = express()
const userRepositoryService = new UserRepositoryService()
const jwtService = new JwtService(new UserRepositoryService())
const UserService = new UserServiceClass(jwtService, userRepositoryService)
const UserController = new UserControllerClass(UserService)
const jwtAuthGuard = new JwtAuthGuard()

userRoute
  .get('/users', UserController.findAll)
  .post('/user/create', UserController.create)
  .get('/user/', UserController.findByEmail)
  .get('/user/:id', UserController.findById)
  .post('/user/:userId/edit', jwtAuthGuard.checkToken, validate(editUserValidator), UserController.update)

export default userRoute
