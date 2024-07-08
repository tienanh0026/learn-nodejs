type DiscordBotEnity = {
  id: string
  guildId: string
  channelId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type DiscordBotCreateParams = {
  guildId: string
  channelId: string
}

export type { DiscordBotEnity, DiscordBotCreateParams }
