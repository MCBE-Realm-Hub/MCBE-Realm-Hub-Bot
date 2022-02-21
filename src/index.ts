import Client from './client';
import { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { database } from './database/database';

dotenv.config();

export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
    failIfNotExists: false
});

client.init(process.env.BOT_TOKEN);

export { database };