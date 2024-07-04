import { Model } from 'sequelize'
import { RoomEntity } from './room.entity'

export type MessageEntity = {
  id: string
  ownerId: string
  roomId: string
  content: string
  type: MessageType
  media?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type MessageDetailModel<T extends Model<MessageEntity, MessageCreateParams>> = T & {
  owner: {
    name: string
    id: string
    email: string
  }
}

export type MessageDetail = MessageEntity & {
  owner: {
    name: string
    id: string
    email: string
  }
}

export type MessageType = '1' | '2' | '3' | '4'

export type MessageRoomEntity = MessageEntity & {
  room: Pick<RoomEntity, 'id' | 'name'>
}

export type MessageCreateParams = Omit<MessageEntity, 'createdAt' | 'deletedAt' | 'updatedAt'>
