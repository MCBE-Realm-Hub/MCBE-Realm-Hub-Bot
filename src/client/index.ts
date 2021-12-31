import path from 'path';
import { existsSync, readdirSync } from 'fs';
import { Client, Collection } from "discord.js";

import { SlashCommand, SlashCommandData, Command } from "../@types/index";

import { Logger } from '../utils/logger';
import { discordAPI } from '../utils/api/discord';
class ClientExtention extends Client {
    public cooldowns: Collection<string, Collection<string, number>> = new Collection();
    public slashCommands: Collection<string, SlashCommand> = new Collection();
    public slashCommandData: Array<SlashCommandData> = [];
    public commands: Collection<string, Command> = new Collection();
    public logger: Logger = new Logger();
    public discordApi: discordAPI = new discordAPI();

    public async init(token: string): Promise<void> {
        this.login(token);
        // Getting to all the event files
        this._eventHandler('client');
        this._eventHandler('server');
        // Getting all the command files
        this._commandHandler('important');
        this._commandHandler('information');
        // Getting all the slash command files
        this._slashCommandHandler('docs');
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
     * @param dir Your directory name
     */
    private async _commandHandler(dir?: string): Promise<void> {
        const commandPath = path.join(__dirname, "..", `commands${dir ? `/${dir}` : ''}`);
        if(!existsSync(commandPath)) return this.logger.error(`[Command] ${commandPath} couldn't be found`);
        readdirSync(commandPath).forEach(async (file: any) => {
            const { command } = await import(`${commandPath}/${file}`);
            this.commands.set(command.name, command);
            this.logger.success(`[Command] Loaded: ${command.name}`);
        });
    };
    public deploySlashCommands(): void;
    public deploySlashCommands(guildID: string): void;
    public deploySlashCommands(guildID: string, redeploy: boolean): void;
    /**
     * Deploy slash commands to guild(s)
     * @param client Constructed client class
     * @param guildID The guild ID to deploy the commands on
     */
    public deploySlashCommands(guildID?: string, redeploy?: boolean): void {
        if(redeploy) this.application.commands.set([], guildID ?? null);
        this.slashCommandData.forEach((json: SlashCommandData) => {
            this.application.commands.create(json, guildID ?? null);
            this.logger.success(`[Slash Command] Successfully deployed: ${json?.name}`);
        });
    };
    /**
     * Remove slash commands from guild(s)
     * @param guildID  The guild ID to remove the slash commands from
     */
    public omitSlashCommands(guildID?: string): void {
        this.application.commands.set([], guildID ?? null);
    };
};

export default ClientExtention;