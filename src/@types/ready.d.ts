export interface botStatus {
    statusType: statusType,
    URL?: string,
    statusMessage: string
}

type statusType = number | "STREAMING" | "WATCHING" | "LISTENING" | "PLAYING" | "CUSTOM" | "COMPETING"