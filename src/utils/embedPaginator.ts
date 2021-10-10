import { Message, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

const buttons = 
    new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('backPage')
            .setLabel('⬅️')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('frontPage')
            .setLabel('➡️')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('deleteEmbed')
            .setLabel('🗑️')
            .setStyle('DANGER')
    );

export async function paginator(message: Message, embeds: Array<MessageEmbed>): Promise<void> {
    let page = 1;
    const embed = () => {
        return embeds[page - 1].setFooter(`Page ${page} of ${embeds.length}`)
    };
    const msg = await message.channel.send({ embeds: [embed()], components: embeds.length > 1 ? [buttons] : null });

    const filter = (interaction) => {
        if(interaction.user.id === message.author.id) return true;
        return interaction.reply({ content: "You may not interact with someone else's embed!", ephemeral: true });
    };

    const collector = msg.createMessageComponentCollector({ filter });
    collector.on('collect', async interaction => {
        switch(interaction.customId) {
            case 'backPage':
                page === 1 ? page = embeds.length : page--;
                interaction.update({ embeds: [embed()] });
            break;
            case 'frontPage':
                page === embeds.length ? page = 1 : page++;
                interaction.update({ embeds: [embed()] });
            break;
            case 'deleteEmbed':
                if(message.channel.type !== 'DM' && message.guild.me.permissions.has('MANAGE_MESSAGES')) 
                    message.delete();
                msg.delete().catch(() => {});
            break;
        };
    });
};