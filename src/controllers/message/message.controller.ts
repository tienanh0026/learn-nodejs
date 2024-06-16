import { formatResponse } from '@/common/response/response'
import { MessageService as MessageServiceClass } from '@/services/message/message.service'
import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ResponseBody } from '../types'
import { CreateMessageRequest } from '@/modules/dto/message/message.request'
const MessageService = new MessageServiceClass()

export class MessageController {
  sendMessage: RequestHandler<ParamsDictionary, ResponseBody<null>, CreateMessageRequest> = async (req, res, next) => {
    try {
      console.log(req)
      await MessageService.createMessage(req)
      const response = formatResponse(null)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
