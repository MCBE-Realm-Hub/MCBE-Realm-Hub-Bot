import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { v4 as uuidv4 } from 'uuid';

import { accent } from '../../../assets/color/hex.json';

import { Command } from "../../@types";

export const command: Command = {
    cooldown: '10 seconds',
    data: new SlashCommandBuilder()
        .setName('uuidv4')
        .setDescription('Generate UUID v4s.')
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('The amount of UUID v4s to generate.')
        ),
    async execute(client, interaction) {
        const amount = interaction.options.getInteger('amount') < 0 ? 1 : interaction.options.getInteger('amount') || 1;
        if(amount > 10) interaction.reply({ content: 'You may only generate an number between 1 - 10.', ephemeral: true });
        else {
            await interaction.deferReply();
            const embed = new MessageEmbed()
                .setColor(`#${accent}`)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTitle('UUID v4')
                .setDescription('')
                .setTimestamp();
            for(let i = 0; i < amount; i++) {
                embed.description += `${uuidv4()}\n\n`
            };
            interaction.editReply({ embeds: [embed] });
        };
    }
};