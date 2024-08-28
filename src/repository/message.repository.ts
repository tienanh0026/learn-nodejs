import { Message } from '@/database/models/message/message.model'
import { MessageCreateParams, MessageDetail, MessageEntity, MessageRoomEntity } from '@/domain/entity/message.entity'
import { WhereOptions, FindOptions, Attributes } from 'sequelize'

interface MessageRepository {
  create: (params: MessageCreateParams) => Promise<MessageDetail>
  getList: (roomId: string) => Promise<MessageEntity[]>
  getOne: (messageId: string) => Promise<MessageRoomEntity | null>
  findAndCountAll: (
    params: WhereOptions<MessageEntity>,
    options: FindOptions<Attributes<Message>>
  ) => Promise<{ rows: Message[]; count: number }>
}

export type { MessageRepository }
