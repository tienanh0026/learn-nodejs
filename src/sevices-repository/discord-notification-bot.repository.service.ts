import { DiscordNotificationBotModel } from '@/database/models/discord-notification-bot/discord-notification-bot.model'
import { DiscordBotCreateParams } from '@/domain/entity/discordNotiBot.entity'

export class DiscordNotificationBotRepositoryService {
  async createNotiSubscription(params: DiscordBotCreateParams) {
    await DiscordNotificationBotModel.create(params)
  }
  async deleteNotiSubscription(params: Partial<DiscordBotCreateParams>) {
    await DiscordNotificationBotModel.destroy({
      where: params
    })
  }
  async findOneSubscription(params: DiscordBotCreateParams) {
    return DiscordNotificationBotModel.findOne({
      where: params
    })
  }
  async findAllSubscription() {
    return DiscordNotificationBotModel.findAll()
  }
  async findServerSubscription(guildId: string) {
    return DiscordNotificationBotModel.findAll({
      where: {
        guildId: guildId
      }
    })
  }
}
