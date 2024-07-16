import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { RoomController as RoomControllerClass } from '@/controllers/room/room.controller'
import { JwtService } from '@/libs/jwt/jwt.service'
import { upload } from '@/libs/storage'
import { RoomService as RoomServiceClass } from '@/services/room/room.service'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import express from 'express'

const roomRoute = express()

const jwtService = new JwtService(new UserRepositoryService())
const RoomService = new RoomServiceClass(new RoomRepositoryService(), jwtService, new RoomUserRepositoryService())
const RoomController = new RoomControllerClass(RoomService)
const JwtAuthGuard = new JwtAuthGuardClass()

roomRoute
  .use('/', JwtAuthGuard.checkToken)
  .post('/create', upload.single('file'), RoomController.createRoom)
  .post('/:roomId/edit', upload.single('file'), RoomController.editRoom)
  .get('/list', RoomController.getRoomList)
  .get('/:roomId', RoomController.getRoom)

export default roomRoute
