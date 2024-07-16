import { MessageType } from '@/domain/entity/message.entity'

type CreateMessageRequest = {
  content: string
  type?: MessageType
  filename?: string
}

type CreateMediaMessageQuery = {
  name: string
  type?: MessageType
}

type GetMessageListRequestQuery = {
  page?: string
  perPage?: string
}

export type { CreateMessageRequest, GetMessageListRequestQuery, CreateMediaMessageQuery }
