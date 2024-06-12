import { RoomCreateParams, RoomEntity } from '@/domain/entity/room.entity'

export interface RoomRepository {
  create(room: RoomCreateParams): Promise<RoomEntity>
  findAll(): Promise<RoomEntity[]>
  findOneById(id: string): Promise<RoomEntity | null>
  delete(id: string): Promise<unknown>
}
