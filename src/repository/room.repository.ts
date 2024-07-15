import { RoomCreateParams, RoomEntity, RoomUpdateEntity } from '@/domain/entity/room.entity'

export interface RoomRepository {
  create(room: RoomCreateParams): Promise<RoomEntity>
  findAll(): Promise<RoomEntity[]>
  findAllAvailableRoom(roomIdArr: string[]): Promise<RoomEntity[]>
  findOneById(id: string): Promise<RoomEntity>
  delete(id: string): Promise<unknown>
  update(param: RoomUpdateEntity): Promise<RoomEntity | null>
}
