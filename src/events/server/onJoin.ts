import {
    GuildMember
} from 'discord.js';

import { Event } from "../../@types/index";
import { welcome_director } from '../../../configuration/ID.json'

export const event: Event = {
    name: 'guildMemberAdd',
    async execute(client, member: GuildMember) {
        var welcome = client.channels.cache.get(welcome_director)
        if (welcome.isText()) {
            welcome.send(member.user.toString()).then(msg => {
                msg.delete()
            })
        }
    }
};