import Client from './client';
import { Intents } from 'discord.js';
import { Config } from './@types/index';
import configJSON from './private/config.json';
import Logger from './utils/logger'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config: Config = configJSON;
client.logger = new Logger()
client.init(config.token);