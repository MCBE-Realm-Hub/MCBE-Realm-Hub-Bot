import { Command } from "../../@types";
import { MessageEmbed, Collection } from "discord.js";
import { commandPrefix } from '../../private/settings.json';
import { bestStringMatch, compareString } from '../../utils/algorithm';
import { MS } from "../../utils/ms";

function categoryCommands(commands: Collection<string, Command>, category: string): string {
	return commands.filter((cmd) => cmd.category == category && !cmd.disableCommand).map((cmd) => `\`${cmd.name}\``).sort().join(", ") || "`No commands found`";
};

export const command: Command = {
    category: 'Information',
	name: 'help',
	description: 'Use this command to get list of all the bot commands or information about a specific command',
	aliases: [
		'commands'
	],
	usage: '[command name OR category name]',
	example: [
		'help',
		'help hire'
	],
    async execute(client, message, args) {
        const commands = client.commands;
        if(!args.length) {
            const allCommandEmbed = new MessageEmbed()
                .setColor("#2F3136")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic : true }))
                .setTitle(`${client.user.username} Commands`)
                .setDescription(`Type \`${commandPrefix}help\` \`[command OR category]\` to find out more details.`)
                .addField("📚 Information", categoryCommands(commands, "Information"), true)
                .addField("📌 Important", categoryCommands(commands, "Important"), true)
            message.channel.send({ embeds: [allCommandEmbed] });
        } else {
            const msg = args.join(' ');
            const categoryCommands = commands.filter(cmd => cmd.category.toLowerCase() === msg.toLowerCase()).map((cmd) => `\`${cmd.name}\``).sort().join(", ");
            if(categoryCommands) {
                const categoryCommandEmbed = new MessageEmbed()
					.setColor("#2F3136")
					.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic : true }))
					.setTitle(`Category: \`${msg.toUpperCase()}\``)
					.setDescription(`Type \`${commandPrefix}help\` \`[command]\` to find out more details about the command.`)
					.addField('Commands: ', categoryCommands, true)
					.setTimestamp();
				return message.channel.send({ embeds: [categoryCommandEmbed] });
            };
            let commandArr = [];
            commands.map(cmd => {
                commandArr.push(cmd.name);
                if(cmd.aliases) commandArr.push(...cmd.aliases);
            });
            const index = bestStringMatch(msg.toLowerCase(), commandArr);
            if(compareString(commandArr[index], msg.toLowerCase()) < 65) return message.channel.send('That\'s not a valid command!');
            
            const infoCommand = commands.get(commandArr[index]);

            const data = [];
			if(infoCommand.guildOnly) data.push(`Command usable in \`Guild\` only!`);
			if(infoCommand.dmOnly) data.push(`Command usable in \`DMs\` only!`);
			const commandInfoEmbed = new MessageEmbed()
				.setColor("#2F3136")
				.setAuthor(`Command: ${commandPrefix}${infoCommand.name} ${infoCommand.usage ? infoCommand.usage : ''}`)
				.setDescription(data.join('\n'));
			if(infoCommand.category) commandInfoEmbed.addField(`**Category:**`, `\`${infoCommand.category}\``, true);
			if(infoCommand.name) commandInfoEmbed.addField(`**Command:**`, `\`${infoCommand.name}\``, true);
			if(infoCommand.aliases) commandInfoEmbed.addField(`**Aliases:**`, `\`${infoCommand.aliases.join(', ')}\``, true);
			if(infoCommand.description) commandInfoEmbed.addField(`**Description:**`, `\`${infoCommand.description}\``, true);
			if(infoCommand.usage) commandInfoEmbed.addField(`**Usage:**`, `\`${commandPrefix}${infoCommand.name} ${infoCommand.usage}\``, true);
			if(infoCommand.example) commandInfoEmbed.addField(`**Example:**`, `\`${commandPrefix}${infoCommand.example.join(`\n${commandPrefix}`)}\``, true);
			commandInfoEmbed.addField(`**Cooldown:**`, MS(MS(infoCommand.cooldown ? infoCommand.cooldown : '3 seconds'), { compactDuration: false }));
			message.channel.send({ embeds: [commandInfoEmbed] });
        };
    }
};