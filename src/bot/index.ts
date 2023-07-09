import { startSearch } from "./finder";
import {
    Client as IMPPClient,
    InboundChatMessage,
    InboundCustomMessage,
    Participant
} from "../util/MPP";
import { Command } from "./Command";
import { env } from "./env";
import { trpc } from "./client";
import { Logger } from "../util/Logger";
import MPPClient from "mppclone-client";

interface CustomPayloads {
    userset: {
        name: string;
        color: `#${string}`;
    };
    chatlog: {
        message: string;
    };
    changesittingchannel: {
        channel: string;
    };
}

interface UACustomMessage {
    m: "ua";
    token: string;
    payload: CustomPayloads[keyof CustomPayloads] & { m: keyof CustomPayloads };
}

export class Bot {
    public static client = new MPPClient(
        "wss://mppclone.com:8443",
        env.MPPCLONE_FINDER_TOKEN
    );

    public static commands: Command[] = [];
    public static prefix = "ua";
    public static logger = new Logger("MPP Bot");
    public static sittingChannel = "test/awkward";

    public static addCommand(command: Command) {
        this.commands.push(command);
    }

    public static start() {
        this.bindEventListeners();
        this.client.start();
        this.client.setChannel(this.sittingChannel);
        this.client.sendArray([
            {
                m: "+custom"
            }
        ]);

        startSearch();
    }

    public static stop() {
        this.client.stop();
    }

    private static bindEventListeners() {
        this.client.on("a", (msg: InboundChatMessage) => {
            if (!msg.a.startsWith(this.prefix)) return;

            const args = msg.a.split(" ");
            args.shift();
            this.handleCommand(args, msg.p);
        });

        this.client.on(
            "custom",
            (msg: InboundCustomMessage<UACustomMessage>) => {
                if (!msg.data) return;
                if (msg.data.m !== "ua") return;
                if (!msg.data.payload) return;
                let payload = msg.data.payload as Partial<
                    CustomPayloads[keyof CustomPayloads]
                >;

                switch (msg.data.payload.m) {
                    case "userset":
                        payload = msg.data.payload as Partial<
                            CustomPayloads["userset"]
                        >;
                        let name = payload.name;
                        let color = payload.color;

                        if (!name && !color) {
                            return;
                        }

                        this.client.sendArray([
                            {
                                m: "userset",
                                set: { name, color }
                            }
                        ]);

                        break;
                    case "chatlog":
                        payload = msg.data.payload as Partial<
                            CustomPayloads["chatlog"]
                        >;

                        if (!payload.message) return;

                        this.client.sendArray([
                            {
                                m: "a",
                                message: `[LOG] \`${msg.p.substring(0, 6)}\`: ${
                                    payload.message
                                }`
                            }
                        ]);

                        break;
                    case "changesittingchannel":
                        payload = msg.data.payload as Partial<
                            CustomPayloads["changesittingchannel"]
                        >;

                        if (!payload.channel) return;

                        this.sittingChannel = payload.channel;
                        this.client.setChannel(this.sittingChannel);
                        break;
                    default:
                        this.client.sendArray([
                            {
                                m: "custom",
                                data: {
                                    m: "ua",
                                    payload: {
                                        m: "error",
                                        error: "unknown message"
                                    }
                                },
                                target: {
                                    mode: "id",
                                    id: msg.p
                                }
                            }
                        ]);
                        break;
                }
            }
        );
    }

    public static async handleCommand(args: string[], p: Participant) {
        let usedCommand;
        commandLoop: for (const command of this.commands) {
            let usedAlias;

            aliasLoop: for (const alias of command.aliases) {
                if (alias.toLowerCase() == args[0].toLowerCase()) {
                    usedAlias = alias;
                    break;
                }
            }

            if (!usedAlias) continue commandLoop;
            usedCommand = command;
            break;
        }

        if (!usedCommand) return;

        const out = await usedCommand.func(args, p);

        if (out) {
            this.sendChat(out);
        }
    }

    public static sendChat(message: string) {
        this.client.sendArray([{ m: "a", message: `\u034f${message}` }]);
    }
}

Bot.addCommand({
    id: "help",
    aliases: ["help", "h", "commands", "cmds"],
    visible: true,
    func: () => {
        const out =
            `Commands: ` +
            Bot.commands
                .flatMap(command =>
                    command.visible ? `${command.aliases[0]}` : []
                )
                .join(" | ");
        return out;
    }
});

Bot.addCommand({
    id: "about",
    aliases: ["about", "info"],
    visible: true,
    func: () => {
        return "This is the `mpp-user-archive` query bot by Hri7566. Discord: Hri7566#3409";
    }
});

Bot.addCommand({
    id: "names",
    aliases: ["names"],
    visible: true,
    func: async (args, p) => {
        let id;
        if (!args[1]) id = p._id;
        else id = args.join(" ").substring(args[0].length).trim();

        if (!id) return "No user ID provided.";

        try {
            const names = await trpc.getNameHistory.query({ id });

            if (names.status == "ok")
                return `Names with ID \`${id}\`: ${(
                    names as { status: string; data: string[] }
                ).data.join(" | ")}`;
            else
                return `Error: ${
                    (names as { status: string; error: string }).error
                }`;
        } catch (err) {
            Bot.logger.error("Unable to connect to server:", err);
            return `Unable to connect to server.`;
        }
    }
});

Bot.addCommand({
    id: "ids",
    aliases: ["ids"],
    visible: true,
    func: async (args, p) => {
        let name;
        if (!args[1]) name = p.name;
        else name = args.join(" ").substring(args[0].length).trim();

        if (!name) return "No name provided.";

        try {
            const ids = await trpc.getIDsFromName.query({ name });

            if (ids.status == "ok")
                return `IDs with name "${name}": ${(
                    ids as { status: string; data: string[] }
                ).data.join(" | ")}`;
            else
                return `Error: ${
                    (ids as { status: string; error: string }).error
                }`;
        } catch (err) {
            Bot.logger.error("Unable to connect to server:", err);
            return `Unable to connect to server.`;
        }
    }
});

Bot.addCommand({
    id: "totalusers",
    aliases: ["totalusers", "usertotal", "usercount", "uc"],
    visible: true,
    func: async (args, p) => {
        try {
            const userCount = await trpc.getUserCount.query();
            return `Total users: ${userCount}`;
        } catch (err) {
            Bot.logger.error("Unable to connect to server:", err);
            return `Unable to connect to server.`;
        }
    }
});

Bot.addCommand({
    id: "id",
    aliases: ["id"],
    visible: false,
    func: async (args, p) => {
        return `Your user ID: \`${p._id}\``;
    }
});

Bot.start();
