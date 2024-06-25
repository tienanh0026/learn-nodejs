import sequelizeConnection from '@/database/connection'
import { SubscriptionCreateParams, SubscriptionEnity } from '@/domain/entity/subscription.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class Subscription extends Model<SubscriptionEnity, SubscriptionCreateParams> implements SubscriptionEnity {
  public id!: string
  public userId!: string
  public roomId!: string
  public endpoint!: string
  public key!: JSON
  public createdAt!: string
  public updatedAt!: string
  public deletedAt!: string
}

export const SubscriptionModel = sequelizeConnection.define<Subscription>(
  'subscription',
  {
    id: {
      field: 'id',
      allowNull: false,
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4
    },
    userId: {
      field: 'user_id',
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    roomId: {
      field: 'room_id',
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
      references: {
        model: 'room',
        key: 'id'
      }
    },
    endpoint: {
      type: DataType.TEXT,
      allowNull: false
    },
    key: {
      type: DataType.JSON,
      allowNull: false
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
    tableName: 'subscription',
    paranoid: true
  }
)
