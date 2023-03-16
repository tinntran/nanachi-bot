import axios from 'axios'
import discord from 'discord.js'

interface Res {
    file_url: string
}

let cooldown: string[] = []

const limit = 20

function getData(data: Res[], bomb: boolean) {
    const randId = Math.round(Math.random() * limit)

    return bomb
        ? data.slice(Math.abs(randId - 5), randId).map((v: Res) => v.file_url.endsWith('.mp4')
            ? new discord.EmbedBuilder().setTitle(v.file_url)
            : new discord.EmbedBuilder().setImage(v.file_url)
        )
        : data[randId].file_url

}

export default async function r34(i: discord.CommandInteraction) {
    const tag = i.options.get('tag')
    const bomb = i.options.get('bomb')?.value as boolean

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

                if (!data || !Array.isArray(data)) return

                return getData(data, bomb)
            })
            .catch(e => {
                console.log(e)
            })
        : await axios.get(
            `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=${limit}&json=1`
        )
            .then((res) => {
                const { data } = res

                if (!data || !Array.isArray(data)) return

                return getData(data, bomb)
            })
            .catch(e => {
                console.log(e)
            })

    if (!res || res == '') {
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