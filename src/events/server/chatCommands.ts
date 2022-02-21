import {
    Message, MessageActionRow, MessageButton,
} from 'discord.js';
import { developerID } from '../../../configuration/ID.json'

import { Event } from "../../@types/index";

var embeds = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945207327387189279/RHinformation_2.png?width=1217&height=309" } }, { "title": ":wave:  **Welcome**!", "description": "*MCBE Realm Hub*, a __Minecraft Bedrock community, that specializes in Realm development__! As a community we discuss and help out with addons, packs, and gametest and many more topics. We have development channels made for collaboration and constructive feedback with a goal to spark inspiration, uniqueness, and creativity in realm development.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":link:  **Links**", "description": "**Click on the linked buttons below to navigate through our main channels**. We ask you to read our **[Rules-Info](https://discordapp.com/channels/753438334663000116/945212679876919296)**! Also, check out our **[Portfolio](https://discordapp.com/channels/753438334663000116/945212679876919296)** where our community projects/packs are posted. Ask questions or get answers in our **[Help Desk](https://discordapp.com/channels/753438334663000116/945212679876919296)**.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if (!developerID.includes(message.author.id)) return

        if (message.content == '!sendinfoembed') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Verify')
                        .setStyle('SUCCESS')
                        .setEmoji('945392251486490644')
                        .setCustomId('verify')
                )
            message.channel.send({
                embeds: embeds,
                components: [row]
            })
        }
        if (message.content == '!sendstaff') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Apply')
                        .setStyle('LINK')
                        .setEmoji('945419732985712751')
                        .setURL('https://docs.google.com/forms/d/e/1FAIpQLSd5avDCOReL9IcgXctRi7IywJGrMv9ZpZ90ZDxm7Fz0O74fiw/viewform')
                )
            message.channel.send({
                embeds: staffembed,
                components: [row]
            })
        }
    }
};