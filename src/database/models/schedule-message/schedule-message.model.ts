import sequelizeConnection from '@/database/connection'
import { MessageType } from '@/domain/entity/message.entity'
import { ScheduleMessageCreateParams, ScheduleMessageEntity } from '@/domain/entity/scheduleMessage.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class ScheduleMessage
  extends Model<ScheduleMessageEntity, ScheduleMessageCreateParams>
  implements ScheduleMessageEntity
{
  public id!: string
  public ownerId!: string
  public roomId!: string
  public messageId!: string
  public content!: string
  public type!: MessageType
  public media!: string
  public createdAt!: string
  public deletedAt!: string
  public scheduleAt!: string
}

export const ScheduleMessageModel = sequelizeConnection.define<ScheduleMessage>(
  'schedule-message',
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
    messageId: {
      field: 'message_id',
      type: DataType.UUID,
      allowNull: false
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
    type: {
      type: DataType.ENUM('1', '2', '3'),
      allowNull: false,
      defaultValue: '1'
    },
    media: {
      type: DataType.STRING,
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: 'timestamp'
    },
    scheduleAt: {
      field: 'schedule_at',
      allowNull: false,
      type: DataType.DATE
    }
  },
  {
    tableName: 'schedule-message',
    updatedAt: false
  }
)
