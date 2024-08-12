import { RoomUserModel } from '@/database/models/room-user/room-user.model'
import { RoomUserCreateParams, RoomUserEntity } from '@/domain/entity/roomUser.entity'
import { RoomUserRepository } from '@/repository/roomUser.repository'
import { Sequelize } from 'sequelize'

export class RoomUserRepositoryService implements RoomUserRepository {
  create(data: RoomUserCreateParams): Promise<void> {
    return RoomUserModel.create(data, {
      ignoreDuplicates: true
    })
  }
  findOne(data: Partial<RoomUserEntity>) {
    return RoomUserModel.findOne({
      where: data
    })
  }
  findById(data: Partial<RoomUserEntity>) {
    return RoomUserModel.findAll({
      where: data
    })
  }
  delete({ userId, roomId }: { userId: string; roomId: string }) {
    return RoomUserModel.destroy({
      where: {
        userId,
        roomId
      }
    })
  }
  async readMessage({ userId, roomId, messageId }: { userId: string; roomId: string; messageId: string }) {
    await RoomUserModel.update(
      {
        readAt: Sequelize.fn('NOW'),
        lastReadMessageId: messageId
      },
      {
        where: {
          roomId,
          userId
        }
      }
    )
    return this.findOne({
      userId,
      roomId
    })
  }
}
