import { Event } from "../../@types/index";
import { CommandInteraction } from 'discord.js';

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: CommandInteraction) {
        if(!interaction.isCommand()) return;
        const slashCommand: any = client.slashCommands.get(interaction.commandName);
        if(!slashCommand) return;
        try {
            await slashCommand.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        };
    }
};