import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { RoomController as RoomControllerClass } from '@/controllers/room/room.controller'
import { RoomService as RoomServiceClass } from '@/services/room/room.service'
import express from 'express'
const roomRoute = express()
const RoomService = new RoomServiceClass()
const RoomController = new RoomControllerClass(RoomService)
const JwtAuthGuard = new JwtAuthGuardClass()
roomRoute.post('/room/create', JwtAuthGuard.checkToken, RoomController.createRoom)
roomRoute.post('/room/:roomId/edit', JwtAuthGuard.checkToken, RoomController.editRoom)

export default roomRoute
