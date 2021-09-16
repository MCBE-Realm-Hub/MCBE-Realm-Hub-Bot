import { MessageEmbed } from "discord.js";
import { Command } from "../../@types";
import { prefix } from '../../private/settings.json';
import { MS } from "../../utils/formatter";
import { cooldowns } from "../../events/server/commandHandler";

const yesRegex = /^(\*{2})?yes*(\*{2})?$/i;
const noRegex = /^(\*{2})?no*(\*{2})?$/i;
const questions = [
    'Are you able to pay the developer? (**Yes** / **No**)',
    'Give me a brief **summary** on what you will be expecting to be done by the developer...',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    dmOnly: true,
    category: 'Important',
    name: 'hire',
    description: 'Use this command to submit a post in **MCBE Realm Hub** server that will tell others you are looking to hire!',
    cooldown: '1 hour',
    async execute(client, message, args) {
        const dmChannel = await message.channel.send(`Hey, I will guide you through the process of uploading a hiring post! You may **cancel** this process anytime by simply typing \`${prefix}cancel\`.`);
        const filter = (msg: any) => msg.author.id === message.author.id;
        const collector = dmChannel.channel.createMessageCollector({ filter, time: MS('59 minutes') });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter("MCBE Realm Hub")
            .setTimestamp();
        let atQuestion = 0;
        await dmChannel.channel.send(questions[atQuestion]);
        collector.on('collect', async msg => {
            if(msg.attachments.size) return;
            const collectedMsg = msg.content;
            if(collectedMsg.toLowerCase() === `${prefix}cancel`) {
                const timestamp: any = cooldowns.get(command.name);
                timestamp.delete(message.author.id);
                return collector.stop('canceled');
            };
            switch(atQuestion) {
                case 0:
                    if(collectedMsg.match(noRegex)) embed.description = `${message.author} is looking for a **VOLUNTARY** developer!`;
                    else if(collectedMsg.match(yesRegex)) embed.description = `${message.author} is looking for a **PAID** developer!`;
                    else atQuestion--;
                break;
                case 1:
                    if((embed.description + collectedMsg).length >= 6000) {
                        msg.reply(`Error: Type under 6000 characters`);
                        atQuestion--;
                    } else {
                        embed.description += `\n\n${collectedMsg}`;
                        dmChannel.channel.send({ embeds: [embed]});
                    };
                break;
                case 2:
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
                    dmChannel.channel.send({ embeds: [embed] });
                break;
            };
        });
    }
};