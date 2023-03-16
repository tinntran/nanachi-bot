import discord from 'discord.js'

const riko = `
A dancing Riko GIF 💃
*Every messages that contain 'riko' will activate this command*
`

const r34 = `
Give you nswf images from https://rule34.xxx

**Usage**: /r34 \`tag: [tag1]+[tag2]+...\` \`bomb: [True/False]\`
**Example**: /r34 \`tag: made-in-abyss+video\` \`bomb: True\`
`

export default async function help(i: discord.CommandInteraction) {
  const embed = new discord.EmbedBuilder()
    .setTitle('Using Yurii 101 😱😱🤯🤯')
    .setThumbnail('https://i.pinimg.com/originals/9d/85/af/9d85af38cf4a73cfe0f10f63639dc51a.png')
    .setFields([
      {
        name: '/help',
        value: 'Show this message',
      },
      {
        name: '/riko',
        value: riko,
      },
      {
        name: '/r34',
        value: r34,
      }])
    .setFooter({ text: 'If you are  ̶g̶a̶y̶  having any issues, please wake tinntran up' })

  await i.reply({ embeds: [embed], ephemeral: true })
}