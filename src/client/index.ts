import path from 'path';
import { existsSync, readdirSync } from 'fs';
import { Client, Collection } from "discord.js";

import { slashCommand, slashCommandData } from "../@types/index";

class ClientExtention extends Client {
    public slashCommands: Collection<string, slashCommand> = new Collection();
    public slashCommandData: Array<slashCommandData> = [];
    public commands = new Collection();
    logger: import("c:/Users/roman/Documents/GitHub/MCBE-Realm-Hub-Bot/src/utils/logger").default;

    public async init(token: string): Promise<void> {
        this.login(token);
        /**
         * Getting to all the event files
         */
        this._eventHandler('client');
        this._eventHandler('server');

        /**
         * Get to all the command files
         */
        this._slashCommandHandler('test');
    };
    /**
     * 
     * @param dir Your directory name
     */
    private async _eventHandler(dir?: string): Promise<void> {
        const eventPath = path.join(__dirname, "..", `events${dir ? `/${dir}` : ''}`);
        if(!existsSync(eventPath)) return this.logger.error(`[Event] ${eventPath} couldn't be found`);
        readdirSync(eventPath).forEach(async (file: any) => {
            const { event } = await import(`${eventPath}/${file}`);
            event.once
            ? this.once(event.name, (...args) => event.execute(this, ...args))
            : this.on(event.name, (...args) => event.execute(this, ...args));
            this.logger.success(`[Event] Loaded: ${event.name}`)
        });
    };
    /**
     * 
     * @param dir Your directory name
     */
    private async _slashCommandHandler(dir?: string): Promise<void> {
        const commandPath = path.join(__dirname, "..", `slashCommands${dir ? `/${dir}` : ''}`);
        if(!existsSync(commandPath)) return this.logger.error(`[Slash Command] ${commandPath} couldn't be found`);
        readdirSync(commandPath).forEach(async (file: any) => {
            const { command } = await import(`${commandPath}/${file}`);
            this.slashCommands.set(command.data.name, command);
            this.slashCommandData.push(command.data.toJSON());
            this.logger.success(`[Slash Command] Loaded: ${command.data.name}`);
        });
    };
    /**
     * 
     * @param client Constructed client class
     * @param guildID The guild ID to deploy the commands on
     */
    public deployDevelopmentSlashCommands(client: this, guildID: string): void {
        client.application.commands.set([]);
        this.slashCommandData.forEach((json: slashCommandData) => {
            try {
                client.application.commands.create(json, guildID);
                this.logger.success(`[Slash Command] Successfully deployed: ${json?.name}`);
            } catch(err) {
                this.logger.error(err);
            };
        });
    };
};

export default ClientExtention;