import { Router } from 'express'
import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { MessageController as MessageControllerClass } from '@/controllers/message/message.controller'
import { upload } from '@/libs/storage'

const messageRoute = Router()
const JwtAuthGuard = new JwtAuthGuardClass()
const MessageController = new MessageControllerClass()
messageRoute
  .post('/:roomId/message/', JwtAuthGuard.checkToken, upload.single('file'), MessageController.sendMessage)
  .get('/:roomId/message/list', JwtAuthGuard.checkToken, MessageController.getMessageList)
export default messageRoute
