import { Message } from 'discord.js';

import { channelID } from '../../../configuration/ID.json';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(message.channel.id === channelID.showcaseChannel && message.channel.type === 'GUILD_NEWS') {
            if(!message.attachments.size && !message.content.match(/^(https?):\/\/[^\s$.?#].[^\s]*$/gm)) return message.delete().catch(() => {});
            message.react('👍');
            message.startThread({ name: `${message.author.username}‘s creation`, autoArchiveDuration: 'MAX' });
            message.crosspost();
        };
    }
};