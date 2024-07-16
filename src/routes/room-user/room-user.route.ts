import express from 'express'
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard'
import { RoomUserController } from '@/controllers/roomUser/roomUser.controller'
import { RoomUserServiceClass } from '@/services/roomUser/roomUser.service'
import { JwtService } from '@/libs/jwt/jwt.service'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'

const roomUserRoute = express()

const jwtService = new JwtService(new UserRepositoryService())
const jwtAuthGuard = new JwtAuthGuard()
const roomUserServiceClass = new RoomUserServiceClass(new RoomUserRepositoryService(), jwtService)
const roomUserController = new RoomUserController(roomUserServiceClass)

roomUserRoute
  .use('/', jwtAuthGuard.checkToken)
  .post('/:roomId/user/add', roomUserController.addUser)
  .post('/:roomId/user/remove', roomUserController.removerUser)

export default roomUserRoute
