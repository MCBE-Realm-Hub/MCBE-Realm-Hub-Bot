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
    'What are your skills based around?\nExample: **Functions, textures, and models**',
    'What are you looking forward to do?',
    'How **skilled** would you say you are on the **__assets__** you mentioned previously from?',
    'Please _link_ **at least one** of your work or a portfolio.',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    cooldown: '1 hour',
    dmOnly: true,
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Submit an looking for work post to MCBE Realm Hub server.'),
    async execute(client, interaction) {
        interaction.reply({ content: 'Hey, I will guide you through the process of uploading a work post! You may **cancel** this process anytime by simply typing "\`CANCEL\`".' });
        
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
                
            switch (atQuestion) {
                case 0:
                    embed.description = `${interaction.user} offers to create **${collectedMsg}**`;
                break;
                case 1: 
                    embed.description += `\n\n**Description: **\n${collectedMsg}`;
                break;
                case 2:
                    if(!collectedMsg.match(/^\s*-?\s*\d*\.?\d+\s*$/)) {
                        msg.reply(`Ratings must be in numbers`);
                        atQuestion--;
                        await sleep(1000);
                    } else embed.addField('**Ratings: **', collectedMsg);
                break;
                case 3:
                    if(!collectedMsg.match(/(https?:\/\/[^\s]+)/g)) {
                        interaction.channel.send('Please provide an valid URL link!');
                        atQuestion--;
                        await sleep(1000);
                    } else {
                        embed.addField('**Portfolio: **', collectedMsg);
                        interaction.channel.send({ embeds: [embed] })
                    };
                break;
                case 4:
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
                    const channel = client.channels.cache.get(channelID.workChannel) as TextChannel;
                    const message = await channel.send({ embeds: [embed] });
                    message.startThread({ name: `${message.author.username}‘s post`, autoArchiveDuration: 'MAX' });
                break;
            };
        });
    }
};
