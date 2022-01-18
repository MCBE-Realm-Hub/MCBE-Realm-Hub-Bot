import {
    Message,
    MessageEmbed
} from 'discord.js';

import { accent } from '../../../assets/color/hex.json';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(!message.author.bot && message.content.match(new RegExp(`^<@!?${client.user.id}>$`))) {
            const embed = new MessageEmbed()
                .setColor(`#${accent}`)
                .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setDescription(`Hello, I'm ${client.user.username}! I'm a bot for MCBE Realm Hub, I have various commands you can use. All of the commands are Slash commands.`)
                .setTimestamp();
            message.reply({ embeds: [embed] });
        };
    }
};