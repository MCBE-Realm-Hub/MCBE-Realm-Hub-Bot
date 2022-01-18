import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from 'dotenv';

dotenv.config();

import { Logger } from "../src/other/logger";
import { crawlDir } from "../src/other/crawler";

const logger = new Logger();
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
    const globalCommands = [];

    try {
        for(const file of crawlDir(path.join(__dirname, '..', 'src/commands'), 'ts')) {
            const { command } = await import(file);
            globalCommands.push(command.data.toJSON());
            logger.success(`[Slash Command] Loaded: ${command.data.name}`);
        };
        await rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: globalCommands });
        logger.success('[Slash Command] Successfully deployed!');
        //await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID), { body: [] });
    } catch(err) {
        logger.error(err);
    };
})();