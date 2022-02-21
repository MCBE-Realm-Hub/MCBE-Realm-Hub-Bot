import {
    Message, MessageActionRow, MessageButton,
} from 'discord.js';

import { Event } from "../../@types/index";

var admins = ['918284365967032330', '814148378777878588', '448958396889169921', '320206264820957204', '595835984751493155', '389299933808820224']

var embeds = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945207327387189279/RHinformation_2.png?width=1217&height=309" } }, { "title": ":wave:  **Welcome**!", "description": "*MCBE Realm Hub*, a __Minecraft Bedrock community, that specializes in Realm development__! As a community we discuss and help out with addons, packs, and gametest and many more topics. We have development channels made for collaboration and constructive feedback with a goal to spark inspiration, uniqueness, and creativity in realm development.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":link:  **Links**", "description": "*We ask you to read our* **[Rules-Info](https://discordapp.com/channels/753438334663000116/786296742789906442)**! Also, check out our **[Portfolio](https://discordapp.com/channels/753438334663000116/916785377711386654)** where our community projects/packs are posted. Ask questions or get answers in our **[Help Desk](https://discordapp.com/channels/753438334663000116/793419815792148521)**, a admin or member can always help.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if (!admins.includes(message.author.id)) return

        if (message.content == '!sendinfoembed') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Portfolio')
                        .setStyle('SECONDARY')
                        .setCustomId('null'),
                    new MessageButton()
                        .setLabel('Rules')
                        .setStyle('SUCCESS')
                        .setCustomId('null'),
                    new MessageButton()
                        .setLabel('Help')
                        .setStyle('SECONDARY')
                        .setCustomId('null'),
                    new MessageButton()
                        .setLabel('Verify')
                        .setStyle('SUCCESS')
                        .setCustomId('null')
                )
            message.channel.send({
                embeds: embeds,
                components: [row]
            })
        }
    }
};