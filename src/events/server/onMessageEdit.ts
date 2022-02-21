import {
    Message,
} from 'discord.js';

import { Event } from "../../@types/index";
import Filter from 'bad-words'

var filter = new Filter();

export const event: Event = {
    name: 'messageUpdate',
    async execute(client, old_message: Message, new_message: Message) {
        if (filter.isProfane(new_message.content)) {
            new_message.delete()
            new_message.author.send({
                content: 'Please refrain from using profanity in this server.'
            }).catch((e) => new_message.channel.send({ content: 'Please refrain from using profanity in this server.' }))
        }
    }
};