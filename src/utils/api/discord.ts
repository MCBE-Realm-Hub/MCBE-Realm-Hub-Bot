import fetch from 'node-fetch';
import { snowflake } from '../util';

import Client from '../../client';
import { FindUser, imageURLOptions } from '../../@types/index';

const discordAPILink = 'https://discordapp.com/api';

export class discordAPI {
    async getUser(client: Client, id: string): Promise<FindUser> {
        const response = await fetch(`${discordAPILink}/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
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
            avatarURL({ size }: imageURLOptions = {}) {
                return response.avatar ? `${client.options.http.cdn}/avatars/${response.id}/${response.avatar}.${/^a_/.test(response.avatar) ? 'gif' : 'png'}${size ? `?size=${size}` : ''}` : null;
            },
            bannerURL({ size }: imageURLOptions = {}) {
                return response.banner ? `${client.options.http.cdn}/banners/${response.id}/${response.banner}.${/^a_/.test(response.banner) ? 'gif' : 'png'}${size ? `?size=${size}` : ''}` : null;
            },
            banner_color: response.banner_color,
            accent_color: response.accent_color
        };
    };
};