import path from 'path';
import {
    Client,
    Collection
} from "discord.js";

import { Logger } from '../other/logger';
import { crawlDir } from '../other/crawler';

import { Command } from "../@types";

class ClientExtention extends Client {
    public logger = new Logger();
    public commands: Collection<string, Command> = new Collection();
    public cooldowns: Collection<string, Collection<string, number>> = new Collection();

    public async init(token: string): Promise<void> {
        this._deployEvents();
        this._deployCommands();
        this.login(token);
    };
    private async _deployEvents(): Promise<void> {
        for(const file of crawlDir(path.join(__dirname, "..", `events`), 'ts')) {
            const { event } = await import(file);
            if(event) {
                event?.once
                ? this.once(event.name, (...args) => event.execute(this, ...args))
                : this.on(event.name, (...args) => event.execute(this, ...args));
                this.logger.success(`[Event] Loaded: ${event.name}`);
            };
        };
    };
    private async _deployCommands(): Promise<void> {
        for(const file of crawlDir(path.join(__dirname, "..", `commands`), 'ts')) {
            const { command } = await import(file);
            if(command) {
                this.commands.set(command.data.name, command);
                this.logger.success(`[Slash Command] Loaded: ${command.data.name}`);
            };
        };
    };
};

export default ClientExtention;