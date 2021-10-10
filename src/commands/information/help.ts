import { Command } from "../../@types";
import { MessageEmbed, Collection } from "discord.js";
import color from '../../assets/hex_colors.json';
import { commandPrefix } from '../../private/settings.json';
import { MS } from "../../utils/ms";
import { paginator } from "../../utils/embedPaginator";

const categoryCommands = (commands: Collection<string, Command>, category: string): string => {
	return commands.filter((cmd) => cmd.category == category && !cmd.disableCommand).map((cmd) => `\`${cmd.name}\``).sort().join(", ") || "`No commands found`";
};
const getCommandData = (commands: Collection<string, Command>, allCommands: Array<string>): Array<string> => {
	const data = [];
	allCommands.forEach(cmd => {
		let infoCommand = commands.get(cmd), dataStr = '';
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
                .setColor(`#${color.discord_dark}`)
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic : true }))
                .setTitle(`${client.user.username} Commands`)
                .setDescription(`Type \`${commandPrefix}help\` \`[command OR category]\` to find out more details.`)
                .addField("📚 Information", categoryCommands(commands, "Information"), true)
                .addField("📌 Important", categoryCommands(commands, "Important"), true)
            message.channel.send({ embeds: [allCommandEmbed] });
        } else {
            let msg = args.join(' ').toLowerCase(),
			cmds = commands
				.filter(cmd => cmd.category.toLowerCase() === msg || cmd.name.toLowerCase() === msg || cmd.aliases && cmd.aliases.map(v => v.toLowerCase()).includes(msg))
				.map((cmd) => cmd.name).sort();
			if(!cmds.length) return message.reply("Couldn't find any command **nor** category...");
			const embeds = [];
			getCommandData(commands, cmds).forEach(content => {
				const embed = new MessageEmbed()
					.setColor(`#${color.discord_dark}`)
					.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic : true }))
					.setDescription(content)
					.setTimestamp();
				embeds.push(embed);
			});
			return paginator(message, embeds);
        };
	}
};