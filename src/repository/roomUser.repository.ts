import { RoomUserCreateParams, RoomUserEntity } from '@/domain/entity/roomUser.entity'

export interface RoomUserRepository {
  create: (data: RoomUserCreateParams) => Promise<RoomUserEntity>
  findOne: (data: RoomUserEntity) => Promise<RoomUserEntity | null>
  findById: (data: RoomUserEntity) => Promise<RoomUserEntity[]>
  delete: ({ userId, roomId }: { userId: string; roomId: string }) => Promise<unknown>
}
