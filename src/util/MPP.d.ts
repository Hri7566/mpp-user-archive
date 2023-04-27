import type { EventEmitter } from "node:events";

export declare interface Participant {
    _id: string;
    id: string;
    name: string;
    color: string;
    tag?: {
        text: string;
        color: string;
    };
    vanished?: boolean;
}

export declare interface ParticipantInfo extends Participant {
    x: string | number;
    y: string | number;
}

declare type ChannelSettings = Record<string, string | number | boolean>;

declare interface Channel {
    _id: string;
    id: string;
    count: number;
    crown?: {
        userId: string;
        participantId?: string;
        startPos: {
            x: number | string;
            y: number | string;
        };
        endPos: {
            x: number | string;
            y: number | string;
        };
        time: number;
        userId: string;
    };
    settings: ChannelSettings;
}

declare interface ChannelInfo extends Channel {
    banned?: boolean;
}

export declare interface AccountInfo {
    type: "discord";
    username: string;
    discriminator: string;
    avatar: string;
}

export declare interface InboundChatMessage {
    m: "a";
    a: string;
    p: Participant;
    t: number;
}

export declare interface InboundHiMessage {
    m: "hi";
    t: EpochTimeStamp;
    u: Participant;
    token: string;
    permissions: Record<string, any>;
    accountInfo: AccountInfo;
}

export declare interface InboundListMessage {
    m: "ls";
    c: boolean;
    u: ChannelInfo[];
}

export declare interface InboundChannelMessage {
    m: "ch";
    ch: ChannelInfo;
    ppl: Participant[];
}

export declare class Client extends EventEmitter {
    public ws: WebSocket;
    public accountInfo: any;
    public canConnect: boolean;
    public channel: Channel;
    public connectionAttempts: number;
    public connectionTime: number;
    public desiredChannelId: string;
    public desiredChannelSettings: Partial<ChannelSettings>;
    public loginInfo: unknown;
    public noteBuffer: unknown[];
    public noteBufferTime: number;
    public noteFlushInterval: ReturnType<typeof setInterval>;
    public offlineChannelSettings: Partial<ChannelSettings>;
    public offlineParticipant: Participant;
    public participantId: string;
    public permissions: unknown;
    public pingInterval: ReturnType<typeof setInterval>;
    public ppl: Record<string, Participant>;
    public uri: string;
    public user: Participant;

    public bindEventListeners();
    public start();
    public stop();
    public connect();
    public sendArray(arr: { m: string; [key: string]: any }[]);
    public send(data: string);
    public setChannel(_id: string, set?: Partial<ChannelSettings>);
    // public on(evt: string, func: (...args: any[]) => void);
    // public off(evt: string, func: (...args: any[]) => void);
    // public emit(evt: string, ...args: any[]);
}

export declare class MPP {
    client: Client;
}
