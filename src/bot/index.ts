import type {
    ChatMessage,
    Participant,
    MPP as TMPP,
    Client
} from "../client/MPP";
import { CommandHandler, CommandMessage } from "./commands/Command";
import { Data, User } from "../data/idb";

// const MPP = (globalThis as any).MPP as TMPP;
const MPPClient = require("mppclone-client");

export class Bot {
    // public static client = MPP.client;
    public static client: Client = new MPPClient("wss://mppclone.com");
    public static logger = new Logger("Bot");

    public static async start() {
        Data.start();
        this.bindEventListeners();
        this.logger.info("Loaded");
    }

    public static bindEventListeners() {
        this.client.on("a", async (msg: ChatMessage) => {
            const newmsg: CommandMessage = msg as unknown as CommandMessage;
            const out = await CommandHandler.handleCommand(newmsg);
            if (typeof out == "string") this.sendChat(out);
        });

        this.client.on("participant update", p => {
            this.updateNameHistory(p);
        });

        this.client.on("participant added", p => {
            this.updateNameHistory(p);
        });
    }

    public static sendChat(message: string) {
        this.client.sendArray([
            {
                m: "a",
                message: `\u034f${message}`
            }
        ]);
    }

    public static async updateNameHistory(p: Participant) {
        let user = await Data.getUser(p._id);

        if (!user) {
            await Data.createDefaultUser(p);
            user = await Data.getUser(p._id);
        }

        const name = await Data.getNameHistory(p._id, p.name);
        if (typeof name == "undefined") {
            await Data.addNameHistory(p._id, p.name);
        }
    }
}

import "./commands";
import { Logger } from "../util/Logger";

(async () => {
    await Bot.start();
})();
