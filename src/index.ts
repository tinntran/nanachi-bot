import discord from 'discord.js'
import dotenv from 'dotenv'
import help from './cmds/help'
import r34 from './cmds/r34'
import server from './server'

dotenv.config()

const client = new discord.Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] })

client.on('ready', c => {
  console.log(`Login as ${c.user.tag}`)
})

client.on('messageCreate', msg => {
  if (msg.author.bot) return

  if (msg.content.toLowerCase().includes('riko'))
    msg.channel.send('https://media.giphy.com/media/gmeZw6BWediao155A0/giphy.gif')
})

client.on('interactionCreate', async i => {
  if (!i.isChatInputCommand()) return

  switch (i.commandName) {
    case 'riko':
      await i.reply('https://media.giphy.com/media/gmeZw6BWediao155A0/giphy.gif')
      break

    case 'r34':
      await r34(i)
      break

    case 'help':
      await help(i)
      break

    default:
      break
  }
})

server()
client.login(process.env.TOKEN)
