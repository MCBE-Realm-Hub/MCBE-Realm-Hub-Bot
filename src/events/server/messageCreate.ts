import { Event } from "../../@types/index";
import { Message, MessageEmbed } from 'discord.js';
import { commandPrefix, ID } from '../../private/settings.json';
import { trimString } from "../../utils/util";

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(message.author.bot) return;
        //Bot mentioned
        if(message.content.match(new RegExp(`^<@${client.user.id}>$`))) {
            const embed = new MessageEmbed()
                .setColor('BLURPLE')
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setDescription(`Hello I'm ${client.user.username}!\nMy prefix is \`${commandPrefix}\`\nType \`${commandPrefix}help\` to get a list of my commands!`)
                .setTimestamp();
            message.reply({ embeds: [embed] });
        };
        //Showcase channel
        if(message.channel.id === ID.showcaseChannel && message.channel.type === 'GUILD_NEWS') {
            try {
                if(!message.attachments.size) return message.delete();
                await message.react('👍');
                await message.react('👎');
            } catch(e) {};
            message.startThread({ name: `${message.author.username}'s creation`, autoArchiveDuration: 'MAX' });
            message.crosspost();
        };
        //Suggestion channel
        if(message.channel.id === ID.suggestionChannel) {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`\`${trimString(message.content, 6000).replace(/`/g, '')}\``)
                .setFooter(message.author.id)
                .setTimestamp();
            const embedMsg = await message.channel.send({ embeds: [embed] });
            try {
                await embedMsg.react('<:upvote:821114922645192704>');
                await embedMsg.react('<:downvote:821114932049215579>');
                message.delete();
            } catch(e) {};
            embedMsg.startThread({ name: `${message.author.username}'s suggestion`, autoArchiveDuration: 'MAX' });
        };
    }
};