import { RoomModel } from '@/database/models/room/room.model'
import { RoomCreateParams, RoomEntity } from '@/domain/entity/room.entity'
import { RoomRepository } from '@/repository/room.repository'

export class RoomRepositoryService implements RoomRepository {
  create(room: RoomCreateParams): Promise<RoomEntity> {
    return RoomModel.create(room)
  }
  delete(id: string) {
    return RoomModel.update(
      {
        deletedAt: new Date()
      },
      {
        where: {
          id
        },
        paranoid: false
      }
    )
  }
  findAll(): Promise<RoomEntity[]> {
    return RoomModel.findAll()
  }
  findOneById(id: string): Promise<RoomEntity | null> {
    return RoomModel.findOne({
      where: { id }
    })
  }
}
