import { Event } from "../../@types/index";
import { CommandInteraction, Collection } from 'discord.js';
import MS from "../../utils/ms";

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: CommandInteraction) {
        if(!interaction.isCommand()) return;
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if(!slashCommand) return;

        if(slashCommand.disableCommand) return;
        if(slashCommand.guildOnly && interaction.channel.type === 'DM') return interaction.reply({ content: 'The command cannot be used outside of guilds!', ephemeral: true });
        if(slashCommand.dmOnly && interaction.channel.type !== 'DM') return interaction.reply({ content: 'The command cannot be used outside of DMs!', ephemeral: true });

        if(!client.cooldowns.has(slashCommand.data.name)) client.cooldowns.set(slashCommand.data.name, new Collection());
        const now = Date.now();
        const timestamps: Collection<string, number> = client.cooldowns.get(slashCommand.data.name);
        const cooldownAmount = MS(slashCommand.cooldown || '3000');

        if(timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if(now < expirationTime) {
                const timeLeft = (expirationTime - now);
                return interaction.reply({ content: `Please wait \`${MS(timeLeft)}\` before reusing the \`${slashCommand.data.name}\` command.`, ephemeral: true });
            };
        };
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        try {
            await slashCommand.execute(client, interaction);
        } catch(err) {
            console.log(err);
            await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
        };
    }
};