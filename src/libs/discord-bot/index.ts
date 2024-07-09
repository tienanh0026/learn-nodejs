import { Client, GatewayIntentBits } from 'discord.js'
import { DiscordService } from '@/services/discord-notification-bot/discord-notification-bot.service'
import dotenv from 'dotenv'
import registerCommand from './slash-command'
dotenv.config()

// Get the token from the .env file
const token = process.env.DISCORD_BOT_TOKEN

// Create a new client instance
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] })

/**
 * @description When the client is ready (logged in), this code will run
 * @param {Client} cli The client
 */
discordClient.on('ready', (cli) => {
  cli.user.setPresence({
    status: 'online',
    activities: [{ name: 'Server administration bot', type: 4 }]
  })
  console.log(`${cli.user.displayName} is online2!`)
})

discordClient.on('guildCreate', (guild) => {
  registerCommand(process.env.DISCORD_BOT_ID || '', guild.id)
})

discordClient.login(token)

discordClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  console.log(interaction)

  if (interaction.commandName === 'register_push_noti' && interaction.guildId) {
    const isCreated = await DiscordService.createSubscription({
      channelId: interaction.channelId,
      guildId: interaction.guildId
    })
    if (!isCreated) interaction.reply('You have already registered to this channel')
    else interaction.reply('Chat logs register successfully')
  }
  if (interaction.commandName === 'unregister_push_noti' && interaction.guildId) {
    const isCreated = await DiscordService.deleteSubscription({
      channelId: interaction.channelId,
      guildId: interaction.guildId
    })
    if (!isCreated) interaction.reply("You haven't registered to this channel")
    else interaction.reply('Chat logs unregister successfully')
  }
})

discordClient.on('guildDelete', (guild) => {
  DiscordService.deleteServerSubscription(guild.id)
})

discordClient.on('channelDelete', (channel) => {
  DiscordService.deleteChannelSubscription(channel.id)
})

export default discordClient
