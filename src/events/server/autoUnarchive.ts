import { ThreadChannel } from 'discord.js';

import { channelID } from '../../../configuration/ID.json';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'threadUpdate',
    async execute(client, oldThread: ThreadChannel, newThread: ThreadChannel) {
        if(newThread.archived && (newThread.parentId == channelID.portfolioChannel || newThread.parentId == channelID.buildsChannel || newThread.parentId == channelID.showcaseChannel)) {
            newThread.setArchived(false, 'Haha, no.');
        };
    }
};