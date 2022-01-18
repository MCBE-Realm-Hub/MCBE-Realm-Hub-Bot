import { ClientEvents } from "discord.js";
import Client from '../client';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface Command {
    disableCommand?: boolean,
    guildOnly?: boolean,
    dmOnly?: boolean,
    permissions?: Array<string>,
    cooldown?: string,
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(client: Client, interaction: CommandInteraction): any
};


export interface BotStatus {
    statusType: statusType,
    URL?: string,
    statusMessage: string
};
type StatusType = number | "STREAMING" | "WATCHING" | "LISTENING" | "PLAYING" | "COMPETING";


export interface Event {
    name: keyof ClientEvents,
    once?: boolean,
    execute(client: Client, ...args: any[]): any
}


// Util
type CompactUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y';
export type CompactUnitAnyCase = CompactUnit | Uppercase<CompactUnit>;

export interface DurationInterface {
    short: CompactUnitAnyCase
    long: UnitAnyCase
    duration: number;
}

export interface FindUser {
    id: string,
    bot?: boolean,
    username: string,
    discriminator: number,
    tag: string,
    createdTimestamp: number,
    createdAt: Date,
    avatarURL({ size }: { size?: number } = {}): string,
    bannerURL({ size }: { size?: number } = {}): string,
    banner_color: string,
    accent_color: number
}
export interface imageURLOptions {
    size?: number
};