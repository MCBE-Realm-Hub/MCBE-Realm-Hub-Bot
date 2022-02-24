import {
    Message,
} from 'discord.js';

import { Event } from "../../@types/index";
import Filter from 'bad-words'

let badWords:string[] = [
'fuck',
'fuck you',
'fucker',
'fucking',
'shit',
'piss off',
'dick head',
'dick',
'dicker',
'asshole',
'son of a bitch',
'bastard bitch',
'bitch',
'nigga',
'nigger',
'niggers',
'nigg',
'bamn',
'cunt',
'bollocks',
'bugger',
'bloody hell',
'hoad',
'crikey',
'rubbish',
'shag',
'wanker',
'piss',
'penis',
'pussy',
'twat',
'cunt',
'whore',
'barstard',
'jew bag',
'farmyard tennis',
'flaps',
'gash',
'gippo',
'prozzy',
'proz',
'curry muncher',
'weird'
]

var filter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g, list: badWords });

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
