import { Message, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

const buttons = new MessageActionRow()
    .addComponents(
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

export async function pagedEmbed(message: Message, embedConstructor: MessageEmbed, content: Array<string>): Promise<void> {
    try {
        let page = 1;
        const setPage = () => {
            return embedConstructor
                .setDescription(content[page - 1])
                .setFooter(`Page ${page} of ${content.length}`);
        };
        const msg = await message.channel.send({ embeds: [setPage()], components: [buttons] }) 

        const filter = (interaction) => {
            if(interaction.user.id === message.author.id) return true;
            return interaction.reply({ content: 'You may not interact with someone else\'s page!', ephemeral: true });
        };
        const collector = message.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async interaction => {
            switch(interaction.customId) {
                case 'backPage':
                    page === 1 ? page = content.length : page--;
                    interaction.update({ embeds: [setPage()] });
                break;
                case 'frontPage':
                    page === content.length ? page = 1 : page++;
                    interaction.update({ embeds: [setPage()], components: [buttons]});
                break;
                case 'deleteEmbed':
                    msg.delete().catch(() => {});
                break;
            };
        });
    } catch(e) {};
};