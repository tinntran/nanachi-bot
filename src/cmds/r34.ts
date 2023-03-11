import discord from 'discord.js'

export default async function r34(i: discord.CommandInteraction) {
    const tag = i.options.get('tag')
    const bomb = i.options.get('bomb')

    const limit = 20

    if (tag?.value) {
        const res: any = await fetch(
            `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tag.value}&limit=${limit}&json=1`
        )
            .then(res => res.json())
            .then(data => {
                const randId = Math.random() * limit

                return bomb
                    ? data.slice(Math.abs(randId - 5), randId).map((v: any) =>
                        new discord.EmbedBuilder().setImage(v.file_url))
                    : data[randId].file_url
            })

        if (bomb) {
            await i.reply({
                embeds: res
            })
        }
        else
            await i.reply(res)
    } else {
        const res: any = await fetch(
            `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=${limit}&json=1`
        )
            .then(res => res.json())
            .then(data => {
                const randId = Math.random() * limit

                return bomb
                    ? data.slice(Math.abs(randId - 5), randId).map((v: any) =>
                        new discord.EmbedBuilder().setImage(v.file_url))
                    : data[randId].file_url
            })

        if (bomb) {
            await i.reply({
                embeds: res
            })
        }
        else
            await i.reply(res)
    }
}