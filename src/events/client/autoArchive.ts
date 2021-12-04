import { Event } from "../../@types/index";
import { CommandInteraction, ThreadChannel } from 'discord.js';
import config from '../../private/settings.json'

export const event: Event = {
    name: 'threadUpdate',
    async execute(client, oldThread: ThreadChannel, newThread: ThreadChannel) {
        if(newThread.archived && newThread.parentId == config.ID.threadChannel) {
            newThread.setArchived(false, 'Haha, no.')
        }
    }
};