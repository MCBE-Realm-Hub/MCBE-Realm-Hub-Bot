import { MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../../@types";

export const command: Command = {
    category: 'Test',
    name: 'ping',
    async execute(client, message, args) {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Test')
                    .setStyle('PRIMARY')
            );
        message.reply({ content: 'pong!', components: [button]});
    }
};