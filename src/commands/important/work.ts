import { MessageEmbed, TextChannel } from "discord.js";
import color from '../../assets/hex_colors.json';
import { Command } from "../../@types";
import { commandPrefix, ID } from '../../private/settings.json';
import { MS } from "../../utils/ms";
import { cooldowns } from "../../events/client/commandHandler";
import { sleep } from "../../utils/scheduling";

const yesRegex = /^(\*{2})?yes*(\*{2})?$/i;
const noRegex = /^(\*{2})?no*(\*{2})?$/i;
const questions = [
    'What are your skills based around?\nExample: **functions, textures, and models**',
    'What are you looking forward to do?',
    'How **skilled** would you say you are on the **__assets__** you mentioned previously from?',
    'Please _link_ **at least one** of your work or a portfolio.',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    dmOnly: true,
    category: 'Important',
    name: 'work',
    description: 'Use this command to submit a post in "MCBE Realm Hub" server that will tell others you are looking to be hired!',
    cooldown: '1 hour',
    async execute(client, message, args) {
        const dmChannel = await message.channel.send(`Hey, I will guide you through the process of uploading a work post! You may **cancel** this process anytime by simply typing \`${commandPrefix}cancel\`.`);
        const filter = (msg: any) => msg.author.id === message.author.id;
        const collector = dmChannel.channel.createMessageCollector({ filter, time: MS('59 minutes') });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(`#${color.discord_dark}`)
            .setFooter("MCBE Realm Hub")
            .setTimestamp();
        let atQuestion = 0;
        await sleep(3000);
        dmChannel.channel.send(questions[atQuestion]);
        collector.on('collect', async msg => {
            if(msg.attachments.size) return;
            const collectedMsg = msg.content;
            if(collectedMsg.toLowerCase() === `${commandPrefix}cancel`) {
                const timestamp: any = cooldowns.get(command.name);
                timestamp.delete(message.author.id);
                return collector.stop('canceled');
            };
            switch (atQuestion) {
                case 0:
                    embed.description = `${message.author} offers to create **${collectedMsg}**`;
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
                        dmChannel.channel.send('Please provide a valid URL link!');
                        atQuestion--;
                        await sleep(1000);
                    } else {
                        embed.addField('**Portfolio: **', collectedMsg);
                        dmChannel.channel.send({ embeds: [embed] })
                    };
                break;
                case 4:
                    if(collectedMsg.match(noRegex)) return collector.stop('canceled');
                    else if(!collectedMsg.match(yesRegex)) atQuestion--;
                break;
            };
            if(atQuestion < questions.length - 1) {
                atQuestion++;
                dmChannel.channel.send(questions[atQuestion]);
            } else return collector.stop('finished');
        });
        collector.on('end', async (collected, reason) => {
            switch(reason) {
                case 'canceled':
                    dmChannel.channel.send("Successfully **canceled** the hiring form.");
                break;
                case 'finished':
                    const channel = client.channels.cache.get(ID.workChannel) as TextChannel
                    channel.send({ embeds: [embed] });
                break;
            };
        });
    }
};