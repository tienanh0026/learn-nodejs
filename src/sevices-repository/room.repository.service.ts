import { RoomModel } from '@/database/models/room/room.model'
import { UserModel } from '@/database/models/user/user.model'
import { RoomCreateParams, RoomEntity, RoomUpdateEntity } from '@/domain/entity/room.entity'
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
  async findOneById(id: string): Promise<RoomEntity> {
    const room = await RoomModel.findOne({
      where: { id }
    })
    if (!room) throw new Error()
    else return room
  }
  async findDetailOneById(id: string, ownerId: string) {
    const room = await RoomModel.findOne({
      where: { id },
      include: { model: UserModel, attributes: ['id', 'email'], where: { id: ownerId } }
    })
    if (!room) throw new Error()
    else return room
  }
  async update(param: RoomUpdateEntity): Promise<RoomEntity | null> {
    await RoomModel.update(
      { image: param.image, name: param.name, updatedAt: param.updatedAt },
      {
        where: { id: param.id }
      }
    )
    return await this.findOneById(param.id)
  }
}
