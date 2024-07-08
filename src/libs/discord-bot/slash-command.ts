import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.DISCORD_BOT_TOKEN

const commands = [
  {
    name: 'register_push_noti',
    description: 'register all new message in my practice nodejs app'
  },
  {
    name: 'unregister_push_noti',
    description: 'unregister all new message in my practice nodejs app'
  },
  {
    name: 'test2',
    description: 'test2'
  },
  {
    name: 'test3',
    description: 'test3'
  }
]

const rest = new REST().setToken(token || '')

const registerCommand = async (appId: string, guildId: string) => {
  try {
    await rest.put(Routes.applicationGuildCommands(appId, guildId), {
      body: commands
    })
    console.log('register commands success')
  } catch (error) {
    //
    console.log('error', error)
  }
}

export default registerCommand
