import { MessageEmbed } from "discord.js";
import color from '../../assets/hex_colors.json';
import { Command } from "../../@types";
import { prefix } from '../../private/settings.json';
import { MS } from "../../utils/formatter";
import { cooldowns } from "../../events/server/commandHandler";

const yesRegex = /^(\*{2})?yes*(\*{2})?$/i;
const noRegex = /^(\*{2})?no*(\*{2})?$/i;
const questions = [
    'What type of assets do you create? `For example: command blocks, function, addons, textures and buildings`',
    'What are you looking forward to do?',
    'How **skilled** would you say you are on the **__assets__** you mentioned previously from?',
    'Please link **at least one** of your work or a portfolio. `For example: Youtube Video, Website or something else`',
    'Do you want to submit the following post? (**Yes** / **No**)'
];

export const command: Command = {
    dmOnly: true,
    category: 'Important',
    name: 'work',
    description: 'Use this command to submit a post in "MCBE Realm Hub" server that will tell others you are looking to be hired!',
    cooldown: '1 hour',
    async execute(client, message, args) {
        const dmChannel = await message.channel.send(`Hey, I will guide you through the process of uploading a hiring post! You may **cancel** this process anytime by simply typing \`${prefix}cancel\`.`);
        const filter = (msg: any) => msg.author.id === message.author.id;
        const collector = dmChannel.channel.createMessageCollector({ filter, time: MS('59 minutes') });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(`#${color.discord_dark}`)
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
            switch(atQuestion) {
                case 0:
                    embed.description = `${message.author} offers create ${collectedMsg}`;
                break;
                case 1: 
                    embed.description += `\n\n${collectedMsg}`;
                break;
                case 2:
                    if(!collectedMsg.match(/^\s*-?\s*\d*\.?\d+\s*$/)) {
                        atQuestion--;
                        msg.reply(`Ratings must be in number`);
                    } else embed.addField('Ratings: ', collectedMsg);
                break;
                case 3:
                    embed.addField('Portfolio', collectedMsg);
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
                    //TODO: Send it the the channel int eh server
                    let jobChannel = client.guilds.cache.find(guild => guild.id === "753438334663000116").channels.cache.find(channel => channel.id === '821041141222342696');
                break;
            };
        });
    }
};