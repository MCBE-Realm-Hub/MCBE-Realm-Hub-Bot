import { Command } from "../../@types";
import { MessageEmbed, Collection } from "discord.js";
import { commandPrefix } from '../../private/settings.json';
import { bestStringMatch, compareString } from '../../utils/algorithm';
import { MS } from "../../utils/ms";
import { pagedEmbed } from "../../utils/pagedEmbed";

function categoryCommands(commands: Collection<string, Command>, category: string): string {
	return commands.filter((cmd) => cmd.category == category && !cmd.disableCommand).map((cmd) => `\`${cmd.name}\``).sort().join(", ") || "`No commands found`";
};
function getCommandData(commands, allCommands: Array<string>): Array<string> {
	const data = [];
	allCommands.forEach(cmd => {
		let infoCommand = commands.get(cmd);
		let dataStr = '';
		if(infoCommand.guildOnly) dataStr += 'Command usable in \`Guild\` only!';
		if(infoCommand.dmOnly) dataStr += 'Command usable in \`DMs\` only!';
		if(infoCommand.category) dataStr += `\n**Category:** \`${infoCommand.category}\``;
		if(infoCommand.name) dataStr += `\n**Command:** \`${infoCommand.name}\``;
		if(infoCommand.aliases) dataStr += `\n**Aliases:** \`${infoCommand.aliases.join(', ')}\``;
		if(infoCommand.description) dataStr += `\n**Description:** \`${infoCommand.description}\``;
		if(infoCommand.usage) dataStr += `\n**Usage:** \`${commandPrefix}${infoCommand.name} ${infoCommand.usage}\``;
		if(infoCommand.example) dataStr += `\n**Example:** \`${commandPrefix}${infoCommand.example.join(`\n${commandPrefix}`)}\``;
		dataStr += `\n**Cooldown:** ${MS(MS(infoCommand.cooldown ? infoCommand.cooldown : '3 seconds'), { compactDuration: false })}`;
		data.push(dataStr);
	});
	return data;
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
            const categoryCommands = commands.filter(cmd => cmd.category.toLowerCase() === msg.toLowerCase()).map((cmd) => cmd.name).sort();
            const embed = new MessageEmbed()
					.setColor("#2F3136")
					.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic : true }))
					.setTimestamp();
			if(categoryCommands.length) return categoryCommands.length > 1 ? pagedEmbed(message, embed, getCommandData(commands, categoryCommands)) : message.channel.send({ embeds: [embed.setDescription(getCommandData(commands, categoryCommands)[0])]});
			
			let commandArr = commands.map(cmd => cmd.name);
			const index = bestStringMatch(msg.toLowerCase(), commandArr);
			if(compareString(commandArr[index], msg.toLowerCase()) < 65) return message.channel.send('That\'s not a valid command!');
			embed.setDescription(`${getCommandData(commands, [commandArr[index]])[0]}`);
			message.channel.send({ embeds: [embed] });
        };
    }
};