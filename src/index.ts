import discord from 'discord.js'
import dotenv from 'dotenv'
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
      const tag = i.options.get('tag')
      const limit = 20

      if (tag?.value) {
        const image: any = await fetch(
          `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tag.value}&limit=${limit}&json=1`
        )
          .then(res => res.json())
          .then(data => data[Math.round(Math.random() * limit)].file_url)

        await i.reply(image)
      } else {
        const image: any = await fetch(
          `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=${limit}&json=1`
        )
          .then(res => res.json())
          .then(data => data[Math.round(Math.random() * limit)].file_url)

        await i.reply(image)
      }

      break

    default:
      break
  }
})

server()
client.login(process.env.TOKEN)
