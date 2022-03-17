import {
    MessageEmbed,
    TextChannel
} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

import MS from "../../other/ms";
import { sleep } from "../../other/scheduling";
import { discordDark } from '../../../assets/color/hex.json';
import { channelID } from '../../../configuration/ID.json';

import { Command } from "../../@types";

const yesRegex = /^(\*{2})?yes*(\*{2})?$/i;
const noRegex = /^(\*{2})?no*(\*{2})?$/i;
const questions = [
    'Are you able to pay the developer? (**Yes** / **No**)',
    'Give me a brief **summary** on what you will be expecting to be done by the developer...',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    cooldown: '1 hour',
    dmOnly: true,
    data: new SlashCommandBuilder()
        .setName('hire')
        .setDescription('Submit an hiring post to MCBE Realm Hub server.'),
    async execute(client, interaction) {

       let member = await client.guilds.get('753438334663000116').members.fetch(interaction.user.id)

       if(!member || !member.roles.cache.has('953741470714716231'))
         return interaction.reply({
           'you must be jobs verified to use this command!'
        })

        interaction.reply({ content: 'Hey, I will guide you through the process of uploading a hiring post! You may **cancel** this process anytime by simply typing "\`CANCEL\`".' });
        
        const collector = interaction.channel.createMessageCollector({ filter: msg => msg.author.id === interaction.user.id, time: MS('59 minutes') });

        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setColor(`#${discordDark}`)
            .setFooter({ text: "MCBE Realm Hub" })
            .setTimestamp();

        await sleep(3000);

        let atQuestion = 0;
        interaction.channel.send(questions[atQuestion]);
        collector.on('collect', async msg => {
            if(msg.attachments.size) return;

            const collectedMsg = msg.content;
            if(collectedMsg === 'CANCEL') return collector.stop('canceled');
                
            switch(atQuestion) {
                case 0:
                    if(collectedMsg.match(noRegex)) embed.description = `${interaction.user} is looking for a **VOLUNTARY** developer!`;
                    else if(collectedMsg.match(yesRegex)) embed.description = `${interaction.user} is looking for a **PAID** developer!`;
                    else atQuestion--;
                    await sleep(1000);
                break;
                case 1:
                    if((embed.description + collectedMsg).length >= 6000) {
                        msg.reply('Error: Type under 6000 characters');
                        atQuestion--;
                        await sleep(1000);
                    } else {
                        embed.description += `\n\n${collectedMsg}`;
                        interaction.channel.send({ embeds: [embed]});
                    };
                break;
                case 2:
                    if(collectedMsg.match(noRegex)) return collector.stop('canceled');
                    else if(!collectedMsg.match(yesRegex)) atQuestion--;
                break;
            };
            if(atQuestion < questions.length - 1) {
                atQuestion++;
                interaction.channel.send(questions[atQuestion]);
            } else return collector.stop('finished');
        });
        collector.on('end', async (collected, reason) => {
            switch(reason) {
                case 'canceled':
                    interaction.channel.send("Successfully **canceled** the hiring form.");
                    client.cooldowns.get(command.data.name).delete(interaction.user.id);
                break;
                case 'finished':
                    const channel = client.channels.cache.get(channelID.hireChannel) as TextChannel;
                    const message = await channel.send({ embeds: [embed] });
                    message.startThread({ name: `${interaction.user.username}‘s post`, autoArchiveDuration: 'MAX' });
                break;
            };
        });
    }
};
