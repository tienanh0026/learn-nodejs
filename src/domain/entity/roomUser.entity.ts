export type RoomUserRole = 'admin' | 'user'

export type RoomUserEntity = {
  id: string
  roomId: string
  userId: string
  role: RoomUserRole
  createdAt: string
  updatedAt: string
  readAt: string | null
  lastReadMessageId: string | null
}

export type RoomUserCreateParams = Omit<RoomUserEntity, 'createdAt' | 'updatedAt' | 'readAt' | 'lastReadMessageId'> & {
  role?: RoomUserRole
}
