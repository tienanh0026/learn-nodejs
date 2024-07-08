import sequelizeConnection from '@/database/connection'
import { DiscordBotEnity, DiscordBotCreateParams } from '@/domain/entity/discordNotiBot.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class DiscordNotificationBot extends Model<DiscordBotEnity, DiscordBotCreateParams> implements DiscordBotEnity {
  public id!: string
  public guildId!: string
  public channelId!: string
  public createdAt!: string
  public updatedAt!: string
  public deletedAt!: string
}

export const DiscordNotificationBotModel = sequelizeConnection.define<DiscordNotificationBot>(
  'discord-notification-bot',
  {
    id: {
      field: 'id',
      allowNull: false,
      primaryKey: true,
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
    },
    guildId: {
      field: 'guild_id',
      allowNull: false,
      type: DataType.UUID
    },
    channelId: {
      field: 'channel_id',
      allowNull: false,
      type: DataType.UUID
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
    tableName: 'discord-notification-bot'
  }
)
