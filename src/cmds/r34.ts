import axios from 'axios'
import discord from 'discord.js'

let cooldown: string[] = []

export default async function r34(i: discord.CommandInteraction) {
    const tag = i.options.get('tag')
    const bomb = i.options.get('bomb')

    const limit = 20

    if (cooldown.includes(i.user.id) && bomb) {
        await i.reply({
            content: 'You are on the cooldown, try again in 5s after used the `bomb` command',
            ephemeral: true
        })

        return
    }

    if (bomb) {
        cooldown.push(i.user.id)

        setTimeout(() => {
            cooldown.shift()
        }, 5000)
    }

    const res: any = tag?.value
        ? await axios.get(
            `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tag.value}&limit=${limit}&json=1`
        )
            .then((res) => {
                const { data } = res

                if (!data) return

                const randId = Math.round(Math.random() * limit)

                return bomb
                    ? data.slice(Math.abs(randId - 5), randId).map((v: any) =>
                        new discord.EmbedBuilder().setImage(v.file_url))
                    : data[randId].file_url
            })
            .catch(e => {
                console.log(e)
            })
        : await axios.get(
            `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=${limit}&json=1`
        )
            .then((res) => {
                const { data } = res

                if (!data) return

                const randId = Math.round(Math.random() * limit)

                return bomb
                    ? data.slice(Math.abs(randId - 5), randId).map((v: any) =>
                        new discord.EmbedBuilder().setImage(v.file_url))
                    : data[randId].file_url
            })
            .catch(e => {
                console.log(e)
            })

    if (!res) {
        await i.reply({ content: 'Don\'t have the sauce 😭', ephemeral: true })
    } else {
        if (bomb) {
            await i.reply({
                embeds: res
            })
        }
        else
            await i.reply(res)
    }
}