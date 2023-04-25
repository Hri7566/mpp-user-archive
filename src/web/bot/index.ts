import { Logger } from "../../util/Logger";
import { Command } from "./Command";

export class Bot {
    public static logger = new Logger("Bot");
    public static commands: Command[] = [];

    public static async handleMessage(input: string): Promise<string> {
        for (const command of this.commands) {
            let usedAlias;

            aliasLoop: for (const alias of command.aliases) {
                if (input.toLowerCase().startsWith(alias.toLowerCase())) {
                    usedAlias = alias;
                    break aliasLoop;
                }
            }

            if (!usedAlias) continue;

            try {
                const out = await command.callback(input);
                return out || "";
            } catch (err) {
                this.logger.error(err);
                return "An error has occurred.";
            }
        }

        return "Unknown command";
    }

    public static addCommand(cmd: Command): boolean {
        try {
            this.commands.push(cmd);
            return true;
        } catch (err) {
            return false;
        }
    }
}

Bot.addCommand({
    id: "help",
    aliases: ["help", "h", "commands", "cmds"],
    description: "Get info about commands.",
    usage: "[command]",
    callback: () => {
        // TODO args
        return (
            "Commands: " +
            Bot.commands.map(command => command.aliases[0]).join(" | ")
        );
    }
});

Bot.addCommand({
    id: "ids",
    aliases: ["ids", "i", "_ids", "_i", "id", "_id"],
    description: "Match user IDs with usernames.",
    usage: "<username>",
    callback: () => {
        return "ids placeholder";
    }
});

Bot.addCommand({
    id: "names",
    aliases: ["names", "name", "n"],
    description: "Match usernames with user IDs.",
    usage: "<user_id>",
    callback: () => {
        return "names placeholder";
    }
});
