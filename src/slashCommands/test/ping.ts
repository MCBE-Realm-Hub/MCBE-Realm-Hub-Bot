import Client from '../../client';
import { CommandInteraction } from 'discord.js';
import { slashCommand } from '../../@types/index';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: slashCommand = {
    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test slash command'),
	async execute(client: Client, interaction: CommandInteraction): Promise<void> {
		await interaction.reply('pong!');
	}
};