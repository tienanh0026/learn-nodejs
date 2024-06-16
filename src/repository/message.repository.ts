import { MessageCreateParams, MessageEntity } from '@/domain/entity/message.entity'

interface MessageRepository {
  create: (params: MessageCreateParams) => Promise<MessageEntity>
}

export type { MessageRepository }
