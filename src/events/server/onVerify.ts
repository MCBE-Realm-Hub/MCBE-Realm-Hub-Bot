import {
    ButtonInteraction
} from 'discord.js';

import { Event } from "../../@types/index";

var rules_embeds = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945214100382842890/RH_Rules_FAQ.png?width=1217&height=309" } }, { "title": "**Our Rules**!", "description": "😃 ` RESPECT OTHERS `\nWe ask that any **derogatory conversations, language, slurs, hate speech, and hot topics such as, but not limited to, race, religion, politics**, or anything else not suitable for a *family-friendly* environment are avoided.\n\n📇 ` PROFILE & DATE `\n**Any malicious content or activity in a VC or Chat is NOT permitted**. *Alts are NOT allowed with proof*. No piracy, sexual, NSFW, or otherwise suspicious contents.\n\n📨 ` SPAM & MESSAGE `\n*Spamming isn't fun for anyone*. **Let's ensure all conversations can be read by avoiding excessive caps, repeating messages, or emoji walls**. Do not mass @mention or direct message MCBE Realm Hub Staff. \n\n> Rules are subject to [ **Common Sense** ].\n` 3 WARNINGS YOUR BANNED! `\nRead:  **[Discord  Guidelines ](https://discord.com/guidelines)**", "color": 8101065, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":grey_question:  **FAQ**", "description": "*Where can I find realms to play*? Find realms at **[Realm Showcase](https://discordapp.com/channels/753438334663000116/762016569144377394)**\n~\n*Where can I post my creations*? Post them in **[Creation Showcase](https://discordapp.com/channels/753438334663000116/800578302636851262)**\n~\n*Where is the portfolio*? Find our portfolio embed at **[Hub Portfolio](https://discordapp.com/channels/753438334663000116/916785377711386654)**", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]

export const event: Event = {
    name: 'interactionCreate',
    async execute(client, interaction: ButtonInteraction) {
        if (interaction.isButton()) {
            if (interaction.customId == 'verify') {
                interaction.guild.members.fetch(interaction.user.id).then((member) => {
                    if (member.roles.cache.has('753442479818276904')) return interaction.reply({ content: '<a:4note:938878609282695188> You have already verified', ephemeral: true })
                    member.roles.add('753442479818276904')
                    interaction.user.send({
                        embeds: rules_embeds,
                    })
                        .catch(() => {
                            interaction.reply({
                                embeds: rules_embeds,
                                ephemeral: true
                            })
                        })
                        .then(() => {
                            interaction.reply({
                                content: '<a:4note:938878609282695188> Please check your DMs for the rules.',
                                ephemeral: true
                            })
                        })
                })
            }
        }
    }
};