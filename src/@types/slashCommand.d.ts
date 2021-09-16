import Client from '../client';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface SlashCommand {
    data: SlashCommandBuilder,
    execute(client: Client, ...args: any[]): any
}
export interface SlashCommandData {
    name: string,
    description: string,
    options: Array<any>,
    default_permission: any
}