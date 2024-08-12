import sequelizeConnection from '@/database/connection'
import { RoomUserEntity, RoomUserCreateParams, RoomUserRole } from '@/domain/entity/roomUser.entity'
import { DataType, Model } from 'sequelize-typescript'

export class RoomUser extends Model<RoomUserEntity, RoomUserCreateParams> implements RoomUserEntity {
  public id!: string
  public roomId!: string
  public userId!: string
  public role!: RoomUserRole
  public createdAt!: string
  public updatedAt!: string
  public readAt!: string
  public lastReadMessageId!: string
}

export const RoomUserModel = sequelizeConnection.define<RoomUser>(
  'room-user',
  {
    id: {
      field: 'id',
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4
    },
    userId: {
      field: 'user_id',
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    role: {
      field: 'role',
      type: DataType.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    roomId: {
      field: 'room_id',
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'room',
        key: 'id'
      }
    },
    createdAt: {
      field: 'created_at',
      type: 'timestamp',
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: 'timestamp',
      allowNull: false
    },
    readAt: {
      field: 'read_at',
      type: 'timestamp',
      allowNull: true
    },
    lastReadMessageId: {
      field: 'last_read_message_id',
      type: DataType.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'room-user',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'room_id']
      }
    ]
  }
)
