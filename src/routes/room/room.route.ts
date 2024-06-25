import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { RoomController as RoomControllerClass } from '@/controllers/room/room.controller'
import { RoomService as RoomServiceClass } from '@/services/room/room.service'
import express from 'express'
const roomRoute = express()
const RoomService = new RoomServiceClass()
const RoomController = new RoomControllerClass(RoomService)
const JwtAuthGuard = new JwtAuthGuardClass()

roomRoute
  .use('/', JwtAuthGuard.checkToken)
  .post('/create', RoomController.createRoom)
  .post('/:roomId/edit', RoomController.editRoom)
  .get('/list', RoomController.getRoomList)
  .get('/:roomId', RoomController.getRoom)

export default roomRoute
