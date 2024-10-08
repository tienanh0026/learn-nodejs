import { Message, MessageModel } from '@/database/models/message/message.model'
import { RoomModel } from '@/database/models/room/room.model'
import { UserModel } from '@/database/models/user/user.model'
import { MessageCreateParams, MessageDetail, MessageEntity, MessageRoomEntity } from '@/domain/entity/message.entity'
import { MessageRepository } from '@/repository/message.repository'
import { Attributes, FindOptions, WhereOptions } from 'sequelize'

export class MessageRepositoryService implements MessageRepository {
  async create(message: MessageCreateParams): Promise<MessageDetail> {
    const newMessage = await MessageModel.create(message, {
      include: {
        model: UserModel,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }
    })
    return newMessage.get({ plain: true }) as MessageDetail
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
      order: ['createdAt'],
      include: {
        model: UserModel,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }
    })
  }
  findAndCountAll(params: WhereOptions<MessageEntity>, options?: FindOptions<Attributes<Message>>) {
    return MessageModel.findAndCountAll({
      where: params,
      ...options,
      include: {
        model: UserModel,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }
    })
  }
}
