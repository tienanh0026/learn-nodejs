import { RoomModel } from '@/database/models/room/room.model'
import { UserModel } from '@/database/models/user/user.model'
import { RoomCreateParams, RoomDetailEntity, RoomEntity, RoomUpdateEntity } from '@/domain/entity/room.entity'
import { RoomRepository } from '@/repository/room.repository'
import { Sequelize } from 'sequelize'

export class RoomRepositoryService implements RoomRepository {
  create(room: RoomCreateParams): Promise<RoomEntity> {
    return RoomModel.create(room)
  }
  delete(id: string) {
    return RoomModel.update(
      {
        deletedAt: Sequelize.fn('NOW')
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
  async findOneById(id: string): Promise<RoomDetailEntity> {
    const room = await RoomModel.findOne({
      where: { id },
      include: { model: UserModel, as: 'owner', attributes: ['id', 'email', 'name'] }
    })
    if (!room) throw new Error()
    else {
      const roomDetail = room.get({ plain: true }) as RoomDetailEntity
      return roomDetail
    }
  }
  async update(param: RoomUpdateEntity): Promise<RoomDetailEntity | null> {
    await RoomModel.update(
      { image: param.image, name: param.name, updatedAt: param.updatedAt },
      {
        where: { id: param.id }
      }
    )
    return await this.findOneById(param.id)
  }
}
