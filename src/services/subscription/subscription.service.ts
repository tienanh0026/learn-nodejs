import { ResponseBody } from '@/controllers/types'
import { JwtService } from '@/libs/jwt/jwt.service'
import { RoomSubcribeNotiRequest, RoomUnsubscribeNotiRequest } from '@/modules/dto/subscription/subscription.request'
import { RoomSubcribeNotiResponse } from '@/modules/dto/subscription/subscription.response'
import { SubscriptionRepositoryService } from '@/sevices-repository/subscription.repository.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'

const _subscriptionRepositoryService = new SubscriptionRepositoryService()

export class SubscriptionService {
  constructor(private _jwtService: JwtService) {}
  async subscribeRoomNoti(
    req: Request<ParamsDictionary, ResponseBody<RoomSubcribeNotiResponse>, RoomSubcribeNotiRequest>
  ) {
    const roomId = req.params.roomId
    const user = await this._jwtService.getUserInfo(req)
    const { endpoint, key, subscriptionId } = req.body
    const existedList = await _subscriptionRepositoryService.findAll({
      roomId: roomId,
      userId: user.id,
      endpoint: endpoint,
      key: key
    })
    if (existedList.length > 0) return existedList[0]
    const newSubscription = await _subscriptionRepositoryService.create({
      id: subscriptionId,
      roomId: roomId,
      userId: user.id,
      endpoint: endpoint,
      key: key
    })
    return newSubscription
  }
  async unsubscribeRoomNoti(req: Request<ParamsDictionary, unknown, RoomUnsubscribeNotiRequest>) {
    const roomId = req.params.roomId
    const user = await this._jwtService.getUserInfo(req)

    const { endpoint } = req.body
    await _subscriptionRepositoryService.softDelete({ endpoint: endpoint, roomId, userId: user.id })
  }
}
