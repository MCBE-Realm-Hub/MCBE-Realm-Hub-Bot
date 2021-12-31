import { Message, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction, InteractionCollector, MessageComponentInteraction } from "discord.js";

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

async function embedPaginator(message: Message, { content, embeds, components, filter }: { content?: string, embeds: Array<MessageEmbed>, components?: Array<MessageActionRow>, filter?: (...args: Array<MessageComponentInteraction>) => boolean | Promise<boolean> }): Promise<void>;
async function embedPaginator(interaction: CommandInteraction, { content, embeds, components, filter }: { content?: string, embeds: Array<MessageEmbed>, components?: Array<MessageActionRow>, filter?: (...args: Array<MessageComponentInteraction>) => boolean | Promise<boolean> }): Promise<void>;
async function embedPaginator(message: Message & CommandInteraction, { content, embeds, components, filter }: { content?: string, embeds: Array<MessageEmbed>, components?: Array<MessageActionRow>, filter?: (...args: Array<MessageComponentInteraction>) => boolean | Promise<boolean> }): Promise<void> {
    const embed = () => {
        return embeds[page - 1].setFooter(`Page ${page} of ${embeds.length}`)
    };
    let page = 1, msg: Message, collector: InteractionCollector<any>;
    const allComponents = components ? components : [];
    if(embeds.length > 1) allComponents.push(buttons);

    if(message?.author) {
        msg = await message.channel.send({ content: content ? content : null, embeds: [embed()], components: allComponents ? allComponents : null });
        collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON' })
    } else if(message?.user) {
        await message.reply({ content: content ? content : null, embeds: [embed()], components: allComponents ? allComponents : null });
        collector = message.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON' });
    };
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
                msg.delete().catch(() => message.deleteReply());
            break;
        };
    });
};

export { embedPaginator };