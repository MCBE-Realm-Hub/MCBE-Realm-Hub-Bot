import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '../../@types/index';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test slash command'),
	async execute(client, interaction: CommandInteraction): Promise<void> {
		await interaction.reply('pong!');
	}
};