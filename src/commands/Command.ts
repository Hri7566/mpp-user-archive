import { Bot } from "..";
import type { ChatMessage, Client } from "../MPP";
import { Data, User } from "../data";
import { Permissions } from "../permissions";

export interface CommandMessage extends ChatMessage {
    prefix: string;
    alias: string;
    user: User;
    args: string[];
    argcat: string;
}

export type CommandCallback = (msg: CommandMessage, cl: Client) => Promise<string | void> | string | void;

export class Command {
    constructor(
        public id: string,
        public aliases: string[],
        public callback: CommandCallback,
        public permissionNode: string,
        public visible: boolean = false
    ) {}
}

export class CommandGroup {
    constructor(
        public id: string,
        public displayName: string,
        public commands: Command[] = []
    ) {}

    public addCommand(command: Command) {
        this.commands.push(command);
    }
}

export class CommandHandler {
    public static commandGroups: CommandGroup[] = [];
    public static prefixes: string[] = ["^"];

    public static async handleCommand(msg: CommandMessage) {
        let usedPrefix;

        msg.args = msg.a.split(' ');
        msg.argcat = msg.a.substring(msg.args[0].length).trim();

        for (const prefix of this.prefixes) {
            if (!msg.a.startsWith(prefix)) continue;
            usedPrefix = msg.a.substring(0, prefix.length);
        }

        if (typeof usedPrefix == 'undefined') return;
        msg.prefix = usedPrefix
        let user = await Data.getUser(msg.p._id);

        if (!user) {
            await Data.createDefaultUser(msg.p);
            user = await Data.getUser(msg.p._id);
        }

        msg.user = (user as User);

        const name = await Data.getNameHistory(msg.p._id, msg.p.name);
        if (typeof name == 'undefined') {
            await Data.addNameHistory(msg.p._id, msg.p.name);
        }

        for (const commandGroup of this.commandGroups) {
            commandLoop:
            for (const command of commandGroup.commands) {
                let usedAlias;
                
                aliasLoop:
                for (const alias of command.aliases) {
                    if (msg.args[0].replace(msg.prefix, "") !== alias) continue aliasLoop;
                    usedAlias = alias;
                }

                if (typeof usedAlias == 'undefined') continue commandLoop;
                msg.alias = usedAlias
                
                const hasPermission = Permissions.testGroupPermission(msg.user.groups, command.permissionNode);
                if (!hasPermission) return;

                try {
                    const out = command.callback(msg, Bot.client);
                    return out;
                } catch (err) {
                    console.error(err);
                    return `An error has occurred.`;
                }
            }
        }
    }

    public static addCommandGroup(commandGroup: CommandGroup) {
        this.commandGroups.push(commandGroup);
    }
}
