import Client from '../../client';
import { Event, botStatus } from "../../@types/index";

export const event: Event = {
    name: 'ready',
    once: true,
    async execute(client: Client) {
        /**
         * Deploy Development slash commands
         */
        client.deployDevelopmentSlashCommands(client, '617248060627746816');
        const twitchURL = "https://www.twitch.tv/notbeertv";
        const botStatus: Array<botStatus> = [
            {
                statusType: "STREAMING",
                URL: twitchURL,
                statusMessage: "@mention me!"
            },
            {
                statusType: "WATCHING",
                statusMessage: `over ${client.guilds.cache.size} servers`
            },
            {
                statusType: "LISTENING",
                statusMessage: `to ${client.channels.cache.size} channels`
            },
            {
                statusType: "WATCHING",
                statusMessage: `over ${client.guilds.cache.size} servers`
            }
        ];
        var onIndex = 1;
        function randomStatus() {
            const status = botStatus[onIndex - 1];
            client.user.setActivity(status.statusMessage ? status.statusMessage : null, {
                type: status.statusType ? status.statusType : null,
                url: status.URL ? status.URL : null
            });
            botStatus.length === onIndex ? onIndex = 1 : onIndex++;
        }; 
        setInterval(randomStatus, 15000);
        randomStatus();
        console.log(`${client.user.username} is online!`);
    }
};