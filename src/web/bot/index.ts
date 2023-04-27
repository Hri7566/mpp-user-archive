import { Logger } from "../../util/Logger";
import { trpc } from "../trpc";
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
    callback: input => {
        const args = input.split(" ");
        const argcat = input.substring(args[0].length).trim();

        if (args[1]) {
            const command = Bot.commands.find(
                z => z.aliases.indexOf(args[1].toLowerCase()) !== -1
            );
            if (command)
                return `Description: ${command.description} | Usage: ${command.aliases[0]} ${command.usage}`;
            else return `No help found for "${argcat}".`;
        } else {
            return (
                "Commands: " +
                Bot.commands.map(command => command.aliases[0]).join(" | ")
            );
        }
    }
});

Bot.addCommand({
    id: "ids",
    aliases: ["ids", "i", "_ids", "_i", "id", "_id"],
    description: "Find a user's name with their user ID.",
    usage: "<username>",
    callback: async (input: string) => {
        const args = input.split(" ");
        const argcat = input.substring(args[0].length).trim();

        if (!argcat) {
            return "Please provide an argument.";
        }

        const data = await trpc.getIDsFromName.query({
            name: argcat
        });

        if (data.status == "ok") {
            const ids = (data as { status: "ok"; data: string[] }).data;

            return `IDs: ${ids.join(" | ")}`;
        } else {
            Bot.logger.error(data);
            return `Error: ${
                (data as { status: "error"; error: string }).error
            }`;
        }
    }
});

Bot.addCommand({
    id: "names",
    aliases: ["names", "name", "n"],
    description: "Find a user's ID with their username",
    usage: "<user_id>",
    callback: async (input: string) => {
        const args = input.split(" ");
        const argcat = input.substring(args[0].length).trim();

        if (!argcat) {
            return "Please provide an argument.";
        }

        const data = await trpc.getNameHistory.query({
            id: argcat
        });

        if (data.status == "ok") {
            const names = (data as { status: "ok"; data: string[] }).data;

            return `Names: ${names.join(" | ")}`;
        } else {
            return `Error: ${
                (data as { status: "error"; error: string }).error
            }`;
        }
    }
});

Bot.addCommand({
    id: "totalusers",
    aliases: ["totalusers", "usertotal"],
    description: "Get the total amount of users in the database.",
    usage: "",
    callback: async (input: string) => {
        const totalUsers = await trpc.getUserCount.query();
        return `Total users: ${totalUsers}`;
    }
});
