import { ResponseBody } from '@/controllers/types'
import { JwtService } from '@/libs/jwt/jwt.service'
import { RoomSubcribeNotiRequest, RoomUnsubscribeNotiRequest } from '@/modules/dto/subscription/subscription.request'
import { RoomSubcribeNotiResponse } from '@/modules/dto/subscription/subscription.response'
import { SubscriptionRepositoryService } from '@/sevices-repository/subscription.repository.service'
import { getToken } from '@/utilities/jwt'
import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'

const _subscriptionRepositoryService = new SubscriptionRepositoryService()
const _jwtService = new JwtService()

export class SubscriptionService {
  async subscribeRoomNoti(
    req: Request<ParamsDictionary, ResponseBody<RoomSubcribeNotiResponse>, RoomSubcribeNotiRequest>
  ) {
    const roomId = req.params.roomId
    const token = getToken(req)
    const userId = _jwtService.verifyAccessToken(token).id
    const { endpoint, key, subscriptionId } = req.body
    const existedList = await _subscriptionRepositoryService.findAll({
      roomId: roomId,
      userId: userId,
      endpoint: endpoint,
      key: key
    })
    if (existedList.length > 0) return existedList[0]
    const newSubscription = await _subscriptionRepositoryService.create({
      id: subscriptionId,
      roomId: roomId,
      userId: userId,
      endpoint: endpoint,
      key: key
    })
    return newSubscription
  }
  async unsubscribeRoomNoti(req: Request<ParamsDictionary, unknown, RoomUnsubscribeNotiRequest>) {
    const roomId = req.params.roomId
    const token = getToken(req)
    const userId = _jwtService.verifyAccessToken(token).id
    const { endpoint } = req.body
    await _subscriptionRepositoryService.softDelete({ endpoint: endpoint, roomId, userId })
  }
}
