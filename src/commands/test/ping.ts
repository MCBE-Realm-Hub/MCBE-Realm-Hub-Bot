import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../../@types";

export const command: Command = {
    cooldown: '120 seconds',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('This is a test command.'),
    execute(client, interaction) {
        interaction.reply({ content: 'Pong!' });
    }
};