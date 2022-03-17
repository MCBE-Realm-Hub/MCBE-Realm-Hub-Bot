import {
    Message, MessageActionRow, MessageButton,
} from 'discord.js';
import { developerID } from '../../../configuration/ID.json'

import { Event } from "../../@types/index";

var embeds = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945207327387189279/RHinformation_2.png?width=1217&height=309" } }, { "title": ":wave:  **Welcome**!", "description": "*MCBE Realm Hub*, a __Minecraft Bedrock community, that specializes in Realm development__! As a community we discuss and help out with addons, packs, gametest, and many more topics. We have development channels made for collaboration and constructive feedback with a goal to spark inspiration, uniqueness, and creativity in realm development.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":link:  **Links**", "description": "**React to the verify button below to get access to our community channels**. *Before you do verify*, we ask you to read our **[Rules](https://discordapp.com/channels/753438334663000116/786296742789906442)**! Also, check out our **[Portfolio](https://discordapp.com/channels/753438334663000116/916785377711386654)** where our open source projects/packs are stored.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
//var embeds = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945207327387189279/RHinformation_2.png?width=1217&height=309" } }, { "title": ":wave:  **Welcome**!", "description": "*MCBE Realm Hub*, a __Minecraft Bedrock community, that specializes in Realm development__! As a community we discuss and help out with addons, packs, and gametest and many more topics. We have development channels made for collaboration and constructive feedback with a goal to spark inspiration, uniqueness, and creativity in realm development.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":link:  **Links**", "description": "**Click on the linked buttons below to navigate through our main channels**. We ask you to read our **[Rules-Info](https://discordapp.com/channels/753438334663000116/945212679876919296)**! Also, check out our **[Portfolio](https://discordapp.com/channels/753438334663000116/945212679876919296)** where our community projects/packs are posted. Ask questions or get answers in our **[Help Desk](https://discordapp.com/channels/753438334663000116/945212679876919296)**.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
var staffembed = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/819070111147229205/945387125568839680/RH_applications.png?width=1217&height=309" } }, { "title": "📝 **Staff Applications**!", "description": "__Become a part of the team today__! Fill out our *12 question Moderator application* now. Click the linked button below, and make sure to stay professional and use common sense when filling out your application. **NOTE** Some applications will not get accepted! Please fill out the application correctly.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
//var embeds = [{"color":3092790,"image":{"url":"https://media.discordapp.net/attachments/945191743572279326/945207327387189279/RHinformation_2.png?width=1217&height=309"}},{"title":":wave:  **Welcome**!","description":"*MCBE Realm Hub*, a __Minecraft Bedrock community, that specializes in Realm development__! As a community we discuss and help out with addons, packs, and gametest and many more topics. We have development channels made for collaboration and constructive feedback with a goal to spark inspiration, uniqueness, and creativity in realm development.","color":3092790,"image":{"url":"https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26"}},{"title":":link:  **Links**","description":"**Click on the linked buttons below to navigate through our main channels**. We ask you to read our **[Rules-Info](https://discordapp.com/channels/753438334663000116/945212679876919296)**! Also, check out our **[Portfolio](https://discordapp.com/channels/753438334663000116/945212679876919296)** where our community projects/packs are posted. Ask questions or get answers in our **[Help Desk](https://discordapp.com/channels/753438334663000116/945212679876919296)**.","color":3092790,"image":{"url":"https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26"}}]
var portembed = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945809112879497246/Untitled9.png?width=1440&height=247" } }, { "title": ":open_file_folder:  **Categories**", "description": "Listed below are __main portfolio category buttons__, click on one you're interested in finding a pack for. This will bring you to a thread with a list of projects for that type of development or project category.\n\n🔗 **Join these main categories threads so they get pinned under this channel**, or join the sub-thread projects in these threads.", "color": 7720184, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1440&height=31" } }]
var portinfo = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945460280056512512/RH_port_information.png?width=1440&height=247" } }, { "title": ":package:  **About**", "description": "The realm hub portfolio, where our member & team **open source** packs and projects are stored. Access our portfolio two ways, `#1` locate the thread icon on the top of this channel, or `#2` click on a named project __Buttons__ below on the Port Embed. \n\n**Join a portfolio project thread** so it gets pinned to your channels. the join button is located on the top right of a thread. Want to contribute? click the embed button below.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1440&height=31" } }]
var portrealmpacks = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/946189547883081728/RH_port_realm_packs.png?width=1440&height=247" } }, { "title": ":package:  **Realm Packs**", "description": "Listed below are our open source Realm packs. Separated into dev categories so you can find what pack your looking for easily. \n:newspaper2: Having Realm Issues? Read over **[Realm Help](https://discordapp.com/channels/753438334663000116/918614235431465010)**", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "color": 7720184, "fields": [{ "name": "**#Main Packs**\n~", "value": "**[Afk detector](https://discordapp.com/channels/753438334663000116/916785775046193224)**\n**[Bigger scores](https://discordapp.com/channels/753438334663000116/916786252584484914)**\n**[Custom spawners](https://discordapp.com/channels/753438334663000116/920110216069144637)**\n**[Custom strings](https://discordapp.com/channels/753438334663000116/916786933378723910)**\n**[Home wraps](https://discordapp.com/channels/753438334663000116/916787332047315034)**\n**[Kill & death counter](https://discordapp.com/channels/753438334663000116/916788841979969607)**\n**[Mob stacker](https://discordapp.com/channels/753438334663000116/916789392151023636)**\n**[Pay system](https://discordapp.com/channels/753438334663000116/933033797451153428)**\n**[Player teams](https://discordapp.com/channels/753438334663000116/916790198099136534)**\n**[Run command on join](https://discordapp.com/channels/753438334663000116/916789663577038938)**\n**[Tpa](https://discordapp.com/channels/753438334663000116/928441960417591356)**\nㅤ", "inline": true }, { "name": "**#Items Packs**\n~", "value": "**[Clickable items](https://discordapp.com/channels/753438334663000116/916808411469983755)**\n**[Item render](https://discordapp.com/channels/753438334663000116/916808222583685151)**\n**[3d modules](https://discordapp.com/channels/753438334663000116/916808516772192306)**\n\n\n**#Entity Packs**\n~\n**[Animated entity](https://discordapp.com/channels/753438334663000116/916809324737728634)**\n**[Custom bossbar](https://discordapp.com/channels/753438334663000116/916809510729941013)**\n**[Damage sensor](https://discordapp.com/channels/753438334663000116/916809129459331113)**\n**[Entity counter](https://discordapp.com/channels/753438334663000116/916808965600464947)**\nㅤ", "inline": true }, { "name": "**#UI Packs**\n~", "value": "**[Debug UI](https://discordapp.com/channels/753438334663000116/916807433026936842)**\n**[NPC GUI](https://discordapp.com/channels/753438334663000116/916806680304558080)**\n**[Personal sidebar](https://discordapp.com/channels/753438334663000116/916807598408347668)**\n**[Sidebar logo](https://discordapp.com/channels/753438334663000116/927692616806592562)**\n**[Text GUI](https://discordapp.com/channels/753438334663000116/916806951319502878)**\n\n**#Generators**\n~\n**[Function gen](https://discordapp.com/channels/753438334663000116/916792212866601002)**\n**[Function-shape gen](https://discordapp.com/channels/753438334663000116/916792422028169326)**\n**[GUI gen](https://discordapp.com/channels/753438334663000116/916803917357154385)**\n**[Island gen](https://discordapp.com/channels/753438334663000116/916788008550821940)**\n**[Manifest gen](https://discordapp.com/channels/753438334663000116/916804395939790889)**\nㅤ" }], "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "color": 3092790, "fields": [{ "name": "**#New Packs**", "value": "**[Anti c-log](https://discordapp.com/channels/753438334663000116/937405919204106340)**\n**[id-system](https://discordapp.com/channels/753438334663000116/939789894753071134)**\nㅤ", "inline": true }, { "name": "**#Beta Packs**", "value": "**[Chest GUI](https://discordapp.com/channels/753438334663000116/916806852719804466)**\n**[Sell pad](https://discordapp.com/channels/753438334663000116/916789825699455006)**\nㅤ", "inline": true }, { "name": "**#Convert**", "value": "**[Covert index](https://discordapp.com/channels/753438334663000116/928747548158607400)**\n**[Chunker](https://discordapp.com/channels/753438334663000116/916825210446028852)**\nㅤ", "inline": true }], "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
var portgametestpacks = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/946189548214423562/RH_portfolio_gametest_.png?width=1440&height=247" } }, { "title": ":package:  **Gametest Packs**", "description": "Listed below are our open source Gametest packs. Make sure __Gametest Futures__ are turned on when using these packs. \n:newspaper2: Having Realm Issues? Read over **[Realm Help](https://discordapp.com/channels/753438334663000116/918614235431465010)**", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "color": 7720184, "fields": [{ "name": "**#Main Packs**\n~", "value": "**[Advanced command handeler](https://discordapp.com/channels/753438334663000116/925138910735126538)**\n**[BeWss](https://discordapp.com/channels/753438334663000116/946507591725502534)**\n**[Chat filter](https://discordapp.com/channels/753438334663000116/926266379768823859)**\n**[Floating leaderboards](https://discordapp.com/channels/753438334663000116/916791762771673159)**\n**[Gametest database](https://discordapp.com/channels/753438334663000116/916805947287040100)**\n**[Gametest starter pack](https://discordapp.com/channels/753438334663000116/916806063364374650)**\n**[Home warps](https://discordapp.com/channels/753438334663000116/916787332047315034)**\n**[Inventory viewer](https://discordapp.com/channels/753438334663000116/916791168203903068)**\nㅤ", "inline": true }, { "name": "**#Beta Packs**\n~", "value": "**[Anti-32k](https://discordapp.com/channels/753438334663000116/939229954560893039)**\n**[Shop-api](https://discordapp.com/channels/753438334663000116/939376455316545657)**", "inline": true }], "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
var portdocpacks = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/946529804973383710/RH_port_docum.png?width=1440&height=247" } }, { "title": ":package:  **Documentations**", "description": "Listed below are our open source Documentations/packs. These docs might help with pack development and learning main components. \n:newspaper2: Having Realm Issues? Read over **[Realm Help](https://discordapp.com/channels/753438334663000116/918614235431465010)**", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "color": 7720184, "fields": [{ "name": "**#Main Docs**\n~", "value": "**[If not statement](https://discordapp.com/channels/753438334663000116/916804907254820975)**\n**[Tellraw Components](https://discordapp.com/channels/753438334663000116/916805406305689603)**\n**[.Lang Components](https://discordapp.com/channels/753438334663000116/945163491646525480)**\nㅤ", "inline": true }, { "name": "**#Essentials**\n~", "value": "**[MCBE essentials](https://discordapp.com/channels/753438334663000116/916790902335365191)**\n**[NBT Editor](https://discordapp.com/channels/753438334663000116/9167906216399585691)**", "inline": true }], "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]
//var realmdev = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/952021540201975818/RH_Realm_Dev1.png?width=1440&height=366" } }, { "title": ":nut_and_bolt:  **Realm Development**", "description": "Get help with main MC development topics here. Listed below are buttons linked to threads depending on the dev topic you need help with. Discuss in these threads and get help from our community. @Mention the team anytime in the threads.", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1440&height=31" } }]
var jobembed = [{ "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/942993687569383456/953775918634139658/Rh_job_list1.png?width=1440&height=366" } }, { "title": ":dollar:  **About**", "description": "Jobs are a main part of MC development. **Find members who are looking to work for you, or find members who offer to create work for you. ** Create list easily through our bots DMs! **/hire** or **/work** <@693922979297361920>", "color": 6262640, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }, { "title": ":link:  **Verify**", "description": "Due to accountability we need ` verification ` before you post your first job/dev list.  This will give you the <@&953741470714716231> role.\n\n**We ask to not scam payment through any job-list or dev-list going forward**, our team does not take in account for this action. If this is the case you will be banned with proof!", "color": 3092790, "image": { "url": "https://media.discordapp.net/attachments/945191743572279326/945198211436535818/Untitled.png?width=1217&height=26" } }]

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if (!developerID.includes(message.author.id)) return

        if (message.content == '!sendinfoembed') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Verify')
                        .setStyle('SUCCESS')
                        .setEmoji('945392251486490644')
                        .setCustomId('verify')
                )
            message.channel.send({
                embeds: embeds,
                components: [row]
            })
        }
        if (message.content == '!sendstaff') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Apply')
                        .setStyle('LINK')
                        .setEmoji('945419732985712751')
                        .setURL('https://docs.google.com/forms/d/e/1FAIpQLSd5avDCOReL9IcgXctRi7IywJGrMv9ZpZ90ZDxm7Fz0O74fiw/viewform')
                        .setDisabled(true)
                )
            message.channel.send({
                embeds: staffembed,
                components: [row]
            })
        }
        if (message.content == '!sendportembed') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Realm Packs')
                        .setStyle('LINK')
                        .setEmoji('944017636726046760')
                        .setURL('https://discordapp.com/channels/753438334663000116/946507535563755571'),

                    new MessageButton()
                        .setLabel('Gametest Packs')
                        .setStyle('LINK')
                        .setEmoji('944017636726046760')
                        .setURL('https://discordapp.com/channels/753438334663000116/946507591725502534'),

                    new MessageButton()
                        .setLabel('Documentations')
                        .setStyle('LINK')
                        .setEmoji('944017636726046760')
                        .setURL('https://discordapp.com/channels/753438334663000116/946507721614692372')
                )
            message.channel.send({
                embeds: portembed,
                components: [row]
            })
        }
        if (message.content == '!sendportinfo') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('rhlicence.doc')
                        .setStyle('LINK')
                        .setEmoji('944017637036417064')
                        .setURL('https://docs.google.com/document/d/1pyKa02n_X3VISl3Tv10rM3hYE1XYfuuBQR4oTShwG1Q/edit?usp=sharing')
                        .setDisabled(false),

                    new MessageButton()
                        .setLabel('Contribute')
                        .setStyle('LINK')
                        .setEmoji('944017636772171836')
                        .setURL('https://discordapp.com/channels/753438334663000116/939388876307439616')
                        .setDisabled(false)
                )
            message.channel.send({
                embeds: portinfo,
                components: [row]
            })
        }
        if (message.content == '!sendportrealmpacks') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('rhlicence.doc')
                        .setStyle('LINK')
                        .setEmoji('944017637036417064')
                        .setURL('https://docs.google.com/document/d/1pyKa02n_X3VISl3Tv10rM3hYE1XYfuuBQR4oTShwG1Q/edit?usp=sharing')
                )
            message.channel.send({
                embeds: portrealmpacks,
                components: [row]
            })
        }
        if (message.content == '!sendportgametestpacks') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('rhlicence.doc')
                        .setStyle('LINK')
                        .setEmoji('944017637036417064')
                        .setURL('https://docs.google.com/document/d/1pyKa02n_X3VISl3Tv10rM3hYE1XYfuuBQR4oTShwG1Q/edit?usp=sharing')
                )
            message.channel.send({
                embeds: portgametestpacks,
                components: [row]
            })
        }
        if (message.content == '!sendportdocpacks') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('rhlicence.doc')
                        .setStyle('LINK')
                        .setEmoji('944017637036417064')
                        .setURL('https://docs.google.com/document/d/1pyKa02n_X3VISl3Tv10rM3hYE1XYfuuBQR4oTShwG1Q/edit?usp=sharing')
                )
            message.channel.send({
                embeds: portdocpacks,
                components: [row]
            })
        }
        if (message.content == '!sendinfojob') {
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Verify')
                        .setStyle('SUCCESS')
                        .setEmoji('945392251486490644')
                        .setCustomId('jobVerify')
                )
            message.channel.send({
                embeds: jobembed,
                components: [row]
            })
        }
    }
};
