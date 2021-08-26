export interface findUserReturn {
    id: string,
    bot?: boolean,
    username: string,
    discriminator: number,
    tag: string,
    createdTimestamp: number,
    createdAt: Date,
    avatar({ size }: { size?: number } = {}): string,
    banner: string,
    banner_color: string,
    accent_color: number
}