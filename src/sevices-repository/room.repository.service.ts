import { RoomModel } from '@/database/models/room/room.model'
import { UserModel } from '@/database/models/user/user.model'
import { RoomCreateParams, RoomDetailEntity, RoomEntity, RoomUpdateEntity } from '@/domain/entity/room.entity'
import BaseError from '@/libs/error/error.model'
import { RoomRepository } from '@/repository/room.repository'
import { Op, Sequelize } from 'sequelize'
import HttpStatusCode from 'http-status-codes'

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
  findAllAvailableRoom(roomIdArr: string[]): Promise<RoomEntity[]> {
    return RoomModel.findAll({
      where: {
        [Op.or]: [
          { type: 1 },
          {
            [Op.and]: [{ type: { [Op.ne]: 1 } }, { id: { [Op.in]: roomIdArr } }]
          }
        ]
      },
      order: [['createdAt', 'DESC']]
    })
  }
  async findOneById(id: string): Promise<RoomDetailEntity> {
    const room = await RoomModel.findOne({
      where: { id },
      include: { model: UserModel, as: 'owner', attributes: ['id', 'email', 'name'] }
    })
    if (!room) throw new BaseError('Room not found', HttpStatusCode.BAD_REQUEST)
    else {
      const roomDetail = room.get({ plain: true }) as RoomDetailEntity
      return roomDetail
    }
  }
  async update(param: RoomUpdateEntity): Promise<RoomDetailEntity | null> {
    await RoomModel.update(
      { image: param.image, name: param.name, updatedAt: param.updatedAt, latestMessageId: param.latestMessageId },
      {
        where: { id: param.id }
      }
    )
    return await this.findOneById(param.id)
  }
}
