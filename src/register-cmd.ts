import { ApplicationCommandOptionType, REST, Routes } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const commands = [
  {
    name: 'riko',
    description: 'A dancing Riko GIF!',
  },
  {
    name: 'r34',
    description: 'Y\'all know how it works 🥵',
    options: [
      {
        name: 'tag',
        description: 'What\'s the sauce?',
        type: ApplicationCommandOptionType.String,
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})()