import { UserEntity } from './user.entity'

export type RoomType = '1' | '2'

export type RoomEntity = {
  id: string
  ownerId: string
  name: string
  image?: string
  type: RoomType
  createdAt: string
  updatedAt: string
  deletedAt: string
  latestMessageId?: string
}

export type RoomDetailEntity = RoomEntity & {
  owner: Pick<UserEntity, 'id' | 'email' | 'name'>
}

export type RoomUpdateEntity = Partial<Omit<RoomEntity, 'createdAt' | 'ownerId' | 'deletedAt'>> & {
  id: string
}

export type RoomCreateParams = Omit<RoomEntity, 'createdAt' | 'deletedAt' | 'updatedAt'> & {
  type?: RoomType
}
