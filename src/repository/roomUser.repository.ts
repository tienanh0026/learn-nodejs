import { RoomUserCreateParams, RoomUserEntity } from '@/domain/entity/roomUser.entity'

export interface RoomUserRepository {
  create(data: RoomUserCreateParams): Promise<void>
  findOne(data: RoomUserEntity): Promise<RoomUserEntity | null>
  findById(data: RoomUserEntity): Promise<RoomUserEntity[]>
  delete({ userId, roomId }: { userId: string; roomId: string }): Promise<unknown>
  readMessage({
    userId,
    roomId,
    messageId
  }: {
    userId: string
    roomId: string
    messageId: string
  }): Promise<RoomUserEntity | null>
}
