import Client from './client';
import { Intents } from 'discord.js';

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ], 
    partials: ["CHANNEL"]
});
client.init(process.env.token);