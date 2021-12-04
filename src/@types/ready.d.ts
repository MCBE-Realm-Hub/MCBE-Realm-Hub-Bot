export interface BotStatus {
    statusType: statusType,
    URL?: string,
    statusMessage: string
}

type statusType = number | "STREAMING" | "WATCHING" | "LISTENING" | "PLAYING" | "COMPETING"