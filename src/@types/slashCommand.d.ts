import Client from '../client';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface SlashCommand {
    disableCommand?: boolean,
    guildOnly?: boolean,
    dmOnly?: boolean,
    cooldown?: string,
    data: any,
    execute(client: Client, interaction: CommandInteraction): any
}
export interface SlashCommandData {
    name: string,
    description: string,
    options: Array<any>,
    default_permission: any
}