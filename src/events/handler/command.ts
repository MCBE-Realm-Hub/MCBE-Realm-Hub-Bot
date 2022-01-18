import {
    CommandInteraction,
    Collection
} from 'discord.js';

import MS from "../../other/ms";

import { Event } from "../../@types";

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: CommandInteraction) {
        if(!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        if(command.disableCommand) return;
        if(command.guildOnly && interaction.channel?.type === 'DM') return interaction.reply({ content: 'The command cannot be used outside of guilds!', ephemeral: true });
        if(command.dmOnly && interaction.channel?.type !== 'DM') return interaction.reply({ content: 'The command cannot be used outside of DMs!', ephemeral: true });

        if(!client.cooldowns.has(command.data.name)) client.cooldowns.set(command.data.name, new Collection());
        const now = Date.now();
        const timestamps: Collection<string, number> = client.cooldowns.get(command.data.name);
        const cooldownAmount = MS(command.cooldown || '0');

        if(timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if(now < expirationTime) {
                const timeLeft = (expirationTime - now);
                return interaction.reply({ content: `Please wait \`${MS(timeLeft, { fullDuration: true, avoidDuration: ['ms'] })}\` before reusing the \`${command.data.name}\` command.`, ephemeral: true });
            };
        };
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        try {
            await command.execute(client, interaction);
        } catch(err) {
            client.logger.error(err);
            await interaction.reply({ content: 'There was an error while trying to execute that command!', ephemeral: true });
        };
    }
};