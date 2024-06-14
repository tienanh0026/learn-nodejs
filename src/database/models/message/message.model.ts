import sequelizeConnection from '@/database/connection'
import { MessageCreateParams, MessageEntity } from '@/domain/entity/message.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class Message extends Model<MessageEntity, MessageCreateParams> implements MessageEntity {
  public id!: string
  public ownerId!: string
  public roomId!: string
  public content!: string
  public createdAt!: string
  public updatedAt!: Date
  public deletedAt!: Date
}

export const MessageModel = sequelizeConnection.define<Message>(
  'message',
  {
    id: {
      field: 'id',
      allowNull: false,
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4
    },
    ownerId: {
      field: 'owner_id',
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
    content: {
      field: 'content',
      type: DataType.STRING,
      validate: {
        min: 1
      }
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: 'timestamp'
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: true,
      type: DataType.DATE
    },
    deletedAt: {
      field: 'deleted_at',
      allowNull: true,
      type: DataType.DATE
    }
  },
  {
    tableName: 'message'
  }
)
