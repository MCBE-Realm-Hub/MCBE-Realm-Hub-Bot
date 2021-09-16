import { MessageEmbed } from "discord.js";
import { Command } from "../../@types";
import { prefix } from '../../private/settings.json';
import { MS } from "../../utils/formatter";
import { cooldowns } from "../../events/server/commandHandler";

const yesRegex = /^(\*{2})?yes*(\*{2})?$/i;
const noRegex = /^(\*{2})?no*(\*{2})?$/i;
const questions = [
    'Are you looking for a **__single__** commission, **__multiple__** commissions or **__both__**?',
    'What type of assets do you create? `For example: command-block, function, add-on, texture and building`',
    'Please link **at least** one of your work or a portfolio. `For example: Youtube Video, Website or something else`',
    'How **skilled** would you say you are on the **__assets__** you mentioned previously?',
    'Tell me a bit about yourself. What are you looking forward to do and how experienced are you?',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    dmOnly: true,
    category: 'Important',
    name: 'work',
    description: 'Use this command to submit a post in **MCBE Realm Hub** server that will tell others you are looking to be hired!',
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
        collector.on('collect', msg => {
            if(msg.attachments.size) return;
            const collectedMsg = msg.content;
            if(collectedMsg.toLowerCase() === `${prefix}cancel`) {
                const timestamp: any = cooldowns.get(command.name);
                timestamp.delete(message.author.id);
                return collector.stop('canceled');
            };
        });
        collector.on('end', async (collected, reason) => {
            switch(reason) {
                case 'canceled':
                    dmChannel.channel.send("Successfully **canceled** the hiring form.");
                break;
            };
        });
    }
};