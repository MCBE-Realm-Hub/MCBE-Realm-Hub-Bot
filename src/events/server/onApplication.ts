import { Message } from 'discord.js';

import { channelID } from '../../../configuration/ID.json';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if (message.channel.id === channelID.application_channel) {
            message.startThread({ name: `Moderator Application ${message.embeds[0].description.split('```')[1] || 'Unknown'}`, autoArchiveDuration: 'MAX' });
        };
    }
};
