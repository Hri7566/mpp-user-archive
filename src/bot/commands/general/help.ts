import { Bot } from "../..";
import { Command, CommandHandler } from "../Command";

export const HELP = new Command(
    "help",
    ["help", "h", "commands", "cmds"],
    (msg, cl) => {
        let out = "Commands: ";
        const cmds: Record<string, string[]> = {};

        for (const commandGroup of CommandHandler.commandGroups) {
            const i: string[] = [];

            commandLoop: for (const command of commandGroup.commands) {
                if (command.visible == false) continue commandLoop;
                i.push(`${msg.prefix}${command.id}`);
            }

            cmds[commandGroup.displayName] = i;
        }

        let timeout = 0;
        for (const key of Object.keys(cmds)) {
            setTimeout(() => {
                Bot.sendChat(`${key}: ${cmds[key].join(", ")}`);
            }, timeout);
            timeout += 650;
        }

        // return out;
    },
    "command.general.help",
    true
);
