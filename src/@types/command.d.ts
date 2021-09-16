import Client from '../client';
import { Message } from "discord.js";

export interface Command {
    disableCommand?: boolean,
    private?: boolean,
    authorPermission?: Array<string>,
    botPermission?: Array<string>,
    guildOnly?: boolean,
    dmOnly?: boolean,
    category: string,
    name: string,
    aliases?: Array<string>,
    description?: string,
    usage?: string, 
    example?: Array<string>,
    cooldown?: string | number,
    execute(client: Client, message: Message, args: Array<string>): any
}