import Client from './client';
import { Intents } from 'discord.js';
import { Config } from './@types/index';
import configJSON from './private/config.json';

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ], 
    partials: ["CHANNEL"]
});
const config: Config = configJSON;
client.init(process.env.token);