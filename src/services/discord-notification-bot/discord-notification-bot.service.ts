import { DiscordBotCreateParams } from '@/domain/entity/discordNotiBot.entity'
import { MessageDetail } from '@/domain/entity/message.entity'
import discordClient from '@/libs/discord-bot'
import { DiscordNotificationBotRepositoryService } from '@/sevices-repository/discord-notification-bot.repository.service'
import {
  bold,
  EmbedBuilder,
  escapeBold,
  quote,
  TextChannel,
  italic,
  escapeItalic,
  heading,
  escapeHeading
} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

export class DiscordNotificationBotService {
  constructor(private _discordNotiBotRepository: DiscordNotificationBotRepositoryService) {}
  async sendMessage(message: MessageDetail) {
    const subcriptionList = await this._discordNotiBotRepository.findAllSubscription()
    if (!subcriptionList || subcriptionList.length === 0) return
    subcriptionList?.forEach((subscription) => {
      const channel = (discordClient.channels.cache.get(subscription.channelId) as TextChannel) || null
      const embedContent = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Room')
        .setURL(process.env.WEB_LINK_URL ? `${process.env.WEB_LINK_URL}/room/${message.roomId}` : '')
        .addFields(
          { name: 'New message', value: `Room ID: ${message.roomId}` },
          { name: 'User', value: message.owner.name, inline: true },
          { name: 'Message', value: message.content, inline: true }
        )
        .setTimestamp()
      const embedArr = [embedContent]
      const formattedMessage =
        heading('New message:\n') +
        escapeHeading(bold(`Room Id`)) +
        ` ${message.roomId}` +
        '\n\n' +
        escapeBold(italic(`${message.owner.name}:`)) +
        '\n' +
        escapeItalic(quote(message.content))
      if (channel) channel.send({ embeds: embedArr, content: formattedMessage })
    })
  }
  async createSubscription(params: DiscordBotCreateParams) {
    const subscription = await this._discordNotiBotRepository.findOneSubscription(params)
    if (subscription) return false
    else {
      await this._discordNotiBotRepository.createNotiSubscription(params)
      return true
    }
  }
  async deleteSubscription(params: DiscordBotCreateParams) {
    const subscription = await this._discordNotiBotRepository.findOneSubscription(params)
    if (!subscription) return false
    else {
      await this._discordNotiBotRepository.deleteNotiSubscription(params)
      return true
    }
  }
  async deleteServerSubscription(guildId: string) {
    this._discordNotiBotRepository.deleteNotiSubscription({ guildId: guildId })
  }
  async deleteChannelSubscription(channelId: string) {
    this._discordNotiBotRepository.deleteNotiSubscription({ channelId: channelId })
  }
}

export const DiscordService = new DiscordNotificationBotService(new DiscordNotificationBotRepositoryService())
