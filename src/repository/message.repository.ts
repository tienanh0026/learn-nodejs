import { Message } from '@/database/models/message/message.model'
import { MessageCreateParams, MessageEntity, MessageRoomEntity } from '@/domain/entity/message.entity'
import { WhereOptions, FindOptions, Attributes } from 'sequelize'

interface MessageRepository {
  create: (params: MessageCreateParams) => Promise<MessageEntity>
  getList: (roomId: string) => Promise<MessageEntity[]>
  getOne: (messageId: string) => Promise<MessageRoomEntity | null>
  findAndCountAll: (
    params: WhereOptions<MessageEntity>,
    options: FindOptions<Attributes<Message>>
  ) => Promise<{ rows: Message[]; count: number }>
}

export type { MessageRepository }
