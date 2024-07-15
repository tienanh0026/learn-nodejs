export type RoomUserRole = 'admin' | 'user'

export type RoomUserEntity = {
  id: string
  roomId: string
  userId: string
  role: RoomUserRole
  createdAt: string
  updatedAt: string
}

export type RoomUserCreateParams = Omit<RoomUserEntity, 'createdAt' | 'updatedAt'> & {
  role?: RoomUserRole
}
