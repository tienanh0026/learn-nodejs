import { ScheduleMessageCreateParams } from '@/domain/entity/scheduleMessage.entity'
import BaseError from '@/libs/error/error.model'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import ScheduleMessageRepositoryService from '@/sevices-repository/schedule-message.repository.service'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'

export default class ScheduleMessageService {
  constructor(
    private _scheduleMessageRepository: ScheduleMessageRepositoryService,
    private _roomUserRepositoryService: RoomUserRepositoryService,
    private _roomRepositoryService: RoomRepositoryService
  ) {}
  async createScheduleMessage(scheduleMessage: Omit<ScheduleMessageCreateParams, 'id'>) {
    const roomId = scheduleMessage.roomId
    const room = await this._roomRepositoryService.findOneById(roomId)
    if (!room) throw new BaseError('room not found', HttpStatusCode.NOT_FOUND)
    if (room.type === '2') {
      const roomUser = await this._roomUserRepositoryService.findOne({
        roomId,
        userId: scheduleMessage.ownerId
      })
      if (!roomUser)
        throw new BaseError("You don't have permission to send message in this room", HttpStatusCode.FORBIDDEN)
    }
    const newScheduleMessage: ScheduleMessageCreateParams = {
      id: uid(),
      ...scheduleMessage
    }
    return await this._scheduleMessageRepository.create(newScheduleMessage)
  }
  async getAllScheduleMessageById(userId: string) {
    return await this._scheduleMessageRepository.getAllByUserId(userId)
  }
  async getAllScheduleMessage() {
    return await this._scheduleMessageRepository.getAll()
  }
  async getOneByMessageId(id: string) {
    return await this._scheduleMessageRepository.getOneByMessageId(id)
  }
  async delete(id: string) {
    return await this._scheduleMessageRepository.delete(id)
  }
  async getListByUserId(userId: string) {
    return await this._scheduleMessageRepository.getAllByUserId(userId)
  }
}
