import fetch from 'node-fetch';
import { snowflake } from '../formatter';

import Client from '../../client';
import { findUserReturn } from '../../@types/index';

const discordAPI = 'https://discordapp.com/api';
const agent = 'Project: https://github.com/MCBE-Realm-Hub/MCBE-Realm-Hub-Bot';

async function getUser(client: Client, id: string): Promise<findUserReturn> {
    const response = await fetch(`${discordAPI}/users/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`,
            'User-Agent': agent
        }
    }).then((v: any) => v.json());

    if(!response.id) return null;
    
    return {
        id: response.id,
        bot: response.bot ? true : false,
        username: response.username,
        discriminator: response.discriminator,
        tag: `${response.username}#${response.discriminator}`,
        createdTimestamp: snowflake(response.id).timestamp,
        createdAt: new Date(response.createdTimestamp),
        avatar({ size }: { size?: number } = {}) {
            return `${client.options.http.cdn}/avatars/${response.id}/${response.avatar}.${/^a_/.test(response.avatar) ? 'gif' : 'png'}${size ? `?size=${size}` : ''}`;
        },
        banner: response.banner,
        banner_color: response.banner_color,
        accent_color: response.accent_color
    };
};

export { getUser }