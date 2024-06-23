export type MessageEntity = {
  id: string
  ownerId: string
  roomId: string
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type MessageCreateParams = Omit<MessageEntity, 'createdAt' | 'deletedAt' | 'updatedAt'>
