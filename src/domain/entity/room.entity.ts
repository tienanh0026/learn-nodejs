export type RoomEntity = {
  id: string
  ownerId: string
  name: string
  image?: string
  createdAt: string
  updatedAt: string
  deletedAt: Date
}

export type RoomCreateParams = Omit<RoomEntity, 'createdAt' | 'deletedAt'>
