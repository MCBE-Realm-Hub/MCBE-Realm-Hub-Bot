import { Message } from 'discord.js';
import { obfuscateString } from 'json-obfuscator';

import {
    getFileContent,
    createFile
} from '../../other/messageFile';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(message.attachments.size) {
            const attachment = message.attachments.first();
            if(attachment.contentType !== 'application/json; charset=utf-8' || attachment.name !== 'request-obfuscation.json') return;
            const content = await getFileContent(attachment.url);
            const obfuscatedJSON = obfuscateString(
                typeof content.data === 'string' 
                ? content.data
                : JSON.stringify(content.data)
            );
            if(!obfuscatedJSON) return message.reply('An error occurred while trying to validate the JSON');
            message.reply({ content: 'Since you have uploaded a JSON file named `request-obfuscation.json`, I have obfuscated the JSON file for you.', files: [createFile(`${obfuscatedJSON}`, `mcbe-realm-hub-obfuscation.json`)] });
        };
    }
};