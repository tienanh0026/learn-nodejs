import { MessageModel } from '@/database/models/message/message.model'
import { MessageCreateParams, MessageEntity } from '@/domain/entity/message.entity'
import { MessageRepository } from '@/repository/message.repository'

export class MessageRepositoryService implements MessageRepository {
  create(message: MessageCreateParams): Promise<MessageEntity> {
    return MessageModel.create(message)
  }
}
