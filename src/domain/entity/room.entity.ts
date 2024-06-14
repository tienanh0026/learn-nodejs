export type RoomEntity = {
  id: string
  ownerId: string
  name: string
  image?: string
  createdAt: string
  updatedAt: string
  deletedAt: Date
}

export type RoomUpdateEntity = Omit<RoomEntity, 'createdAt' | 'ownerId' | 'deletedAt'>

export type RoomCreateParams = Omit<RoomEntity, 'createdAt' | 'deletedAt' | 'updatedAt'>
