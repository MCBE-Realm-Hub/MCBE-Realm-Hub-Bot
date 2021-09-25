import { Event } from "../../@types/index";
import { Message, Collection } from 'discord.js';
import { commandPrefix } from '../../private/settings.json';
import { MS } from "../../utils/ms";

export const cooldowns = new Collection();

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(message.author.bot) return;

        if(!message.content.startsWith(commandPrefix)) return;

        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
        if(!command) return;

        if(command.disableCommand) return;
        if(command.guildOnly && message.channel.type === 'DM') return message.reply('The command cannot be used outside of guilds!').then(msg => setTimeout(() => msg.delete(), 10000));
        if(command.dmOnly && message.channel.type !== 'DM') return message.reply('The command cannot be used outside of DMs!').then(msg => setTimeout(() => msg.delete(), 10000));
        
        if(!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
        const now = Date.now();
        const timestamps: any = cooldowns.get(command.name);
        const cooldownAmount = MS(command.cooldown || '3000');

        if(timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if(now < expirationTime) {
                const timeLeft = (expirationTime - now);
                return message.reply(`Please wait \`${MS(timeLeft)}\` before reusing the \`${command.name}\` command.`).then(msg => setTimeout(() => msg.delete(), 10000)).catch(console.error);
            };
        };
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        try {
            command.execute(client, message, args);
        } catch(err) {
            message.reply('There was an error trying to execute that command!');
        };
    }
};