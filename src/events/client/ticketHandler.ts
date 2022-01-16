import { Event } from "../../@types/index";
import { CommandInteraction } from 'discord.js';

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: CommandInteraction) {
      if(!interaction.isButton()) return
      console.log('nonce')
    }
};
