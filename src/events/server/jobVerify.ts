import {
    ButtonInteraction
} from 'discord.js';

import { Event } from "../../@types/index";

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: ButtonInteraction) {
      if(!interaction.isButton() || interaction.customId != 'jobVerify') 
        return
      
      interaction.guild.members.fetch(interaction.user.id).then(member => {
        if(member.roles.cache.has('953741470714716231'))
          return interaction.reply({
            content: 'you have already been verified to post job/dev list!',
            ephemeral: true
          })
        
        member.roles.add('953741470714716231')
        
        return interaction.reply({
            content: 'you have been verified to post job/dev list!',
            ephemeral: true
          })
     })
   }
};
