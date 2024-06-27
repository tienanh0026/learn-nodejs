import { RoomEntity } from './room.entity'

export type MessageEntity = {
  id: string
  ownerId: string
  roomId: string
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type MessageRoomEntity = MessageEntity & {
  room: Pick<RoomEntity, 'id' | 'name'>
}

export type MessageCreateParams = Omit<MessageEntity, 'createdAt' | 'deletedAt' | 'updatedAt'>
