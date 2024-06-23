import sequelizeConnection from '@/database/connection'
import { RoomCreateParams, RoomEntity } from '@/domain/entity/room.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class Room extends Model<RoomEntity, RoomCreateParams> implements RoomEntity {
  public id!: string
  public name!: string
  public ownerId!: string
  public image!: string
  public createdAt!: string
  public updatedAt!: string
  public deletedAt!: string
}

export const RoomModel = sequelizeConnection.define<Room>(
  'room',
  {
    id: {
      field: 'id',
      allowNull: false,
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4
    },
    name: {
      field: 'name',
      type: DataType.STRING,
      allowNull: false
    },
    ownerId: {
      field: 'owner_id',
      allowNull: false,
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    image: {
      field: 'image',
      type: DataType.STRING,
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: 'timestamp'
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: 'timestamp'
    },
    deletedAt: {
      field: 'deleted_at',
      allowNull: true,
      type: 'timestamp'
    }
  },
  {
    tableName: 'room',
    paranoid: true
  }
)
