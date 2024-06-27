import { MessageCreateParams, MessageEntity, MessageRoomEntity } from '@/domain/entity/message.entity'

interface MessageRepository {
  create: (params: MessageCreateParams) => Promise<MessageEntity>
  getList: (roomId: string) => Promise<MessageEntity[]>
  getOne: (messageId: string) => Promise<MessageRoomEntity | null>
}

export type { MessageRepository }
