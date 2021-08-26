export interface findUserReturn {
    id: string,
    bot?: boolean,
    username: string,
    discriminator: number,
    tag: string,
    createdTimestamp: number,
    createdAt: Date,
    avatarURL({ size }: { size?: number } = {}): string,
    bannerURL({ size }: { size?: number } = {}): string,
    banner_color: string,
    accent_color: number
}