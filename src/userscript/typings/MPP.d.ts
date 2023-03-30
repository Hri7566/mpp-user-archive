import type { EventEmitter } from "node:events";

declare interface Participant {
    _id: string;
    id: string;
    name: string;
    color: string;
    tag?: {
        text: string;
        color: string;
    };
}

declare type ChannelSettings = Record<string, string | number | boolean>;

declare interface Channel {
    _id: string;
    id: string;
    count: number;
    crown: {
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

export declare interface ChatMessage {
    m: "a";
    a: string;
    p: Participant;
    t: number;
}

export declare class Client {
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
    public setChannel(_id: string, set: Partial<ChannelSettings>);
    public on(evt: string, func: (...args: any[]) => void);
    public off(evt: string, func: (...args: any[]) => void);
    public emit(evt: string, ...args: any[]);
}

export declare class MPP {
    client: Client;
}
