import { Message, MessageModel } from '@/database/models/message/message.model'
import { RoomModel } from '@/database/models/room/room.model'
import { MessageCreateParams, MessageEntity, MessageRoomEntity } from '@/domain/entity/message.entity'
import { MessageRepository } from '@/repository/message.repository'
import { Attributes, FindOptions, WhereOptions } from 'sequelize'

export class MessageRepositoryService implements MessageRepository {
  create(message: MessageCreateParams): Promise<MessageEntity> {
    return MessageModel.create(message)
  }
  async getOne(messageId: string): Promise<MessageRoomEntity | null> {
    const message = await MessageModel.findOne({
      where: {
        id: messageId
      },
      include: {
        model: RoomModel,
        as: 'room',
        attributes: ['id', 'name']
      }
    })
    return message?.get({ plain: true }) as MessageRoomEntity | null
  }
  getList(roomId: string): Promise<MessageEntity[]> {
    return MessageModel.findAll({
      where: {
        roomId: roomId
      },
      order: ['createdAt']
    })
  }
  findAll(params: WhereOptions<MessageEntity>, options: FindOptions<Attributes<Message>>) {
    return MessageModel.findAll({
      where: params,
      ...options
    })
  }
}
