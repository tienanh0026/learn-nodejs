import { ScheduleMessageModel } from '@/database/models/schedule-message/schedule-message.model'
import { UserModel } from '@/database/models/user/user.model'
import { ScheduleMessageCreateParams, ScheduleMessageEntity } from '@/domain/entity/scheduleMessage.entity'
import { ScheduleMessageRepository } from '@/repository/scheduleMessage.repository'

export default class ScheduleMessageRepositoryService implements ScheduleMessageRepository {
  create(scheduleMessage: ScheduleMessageCreateParams): Promise<ScheduleMessageEntity> {
    return ScheduleMessageModel.create(scheduleMessage)
  }
  getOneById(id: string): Promise<ScheduleMessageEntity | null> {
    return ScheduleMessageModel.findOne({
      where: {
        id
      }
    })
  }
  getAllByUserId(id: string): Promise<ScheduleMessageEntity[]> {
    return ScheduleMessageModel.findAll({
      where: {
        ownerId: id
      },
      include: {
        model: UserModel,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }
    })
  }
  getAll() {
    return ScheduleMessageModel.findAll()
  }
  delete(id: string): Promise<unknown> {
    return ScheduleMessageModel.destroy({
      where: {
        id
      }
    })
  }
  getOneByMessageId(id: string): Promise<ScheduleMessageEntity | null> {
    console.log(id)

    return ScheduleMessageModel.findOne({
      where: {
        messageId: id
      }
    })
  }
}
