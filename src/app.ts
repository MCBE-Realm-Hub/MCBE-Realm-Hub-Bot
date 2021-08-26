import Client from './client';
import { Intents } from 'discord.js';
import { Config } from './@types/index';
import configJSON from './private/config.json';
import { getUser } from './utils/api/discord';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"] });
const config: Config = configJSON;
client.init(config.token);