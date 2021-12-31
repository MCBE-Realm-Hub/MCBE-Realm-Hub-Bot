import { Event } from "../../@types/index";
import { CommandInteraction, ThreadChannel } from 'discord.js';
import { ID } from '../../private/settings.json'

export const event: Event = {
    name: 'threadUpdate',
    async execute(client, oldThread: ThreadChannel, newThread: ThreadChannel) {
        if(newThread.archived && (newThread.parentId == ID.threadChannel || newThread.parentId == ID.buildsChannel)) {
            newThread.setArchived(false, 'Haha, no.')
        }
    }
};
