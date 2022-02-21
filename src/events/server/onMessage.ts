import {
    Message,
} from 'discord.js';

import { Event } from "../../@types/index";
import Filter from 'bad-words'

var filter = new Filter();

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if (filter.isProfane(message.content)) {
            message.delete()
            message.author.send({
                content: 'Please refrain from using profanity in this server.'
            }).catch((e) => message.channel.send({ content: 'Please refrain from using profanity in this server.' }))
        }
    }
};