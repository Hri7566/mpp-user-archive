import { Command, CommandHandler } from "../Command";

export const HELP = new Command("help", ["help", "h", "commands", "cmds"], (msg, cl) => {
    let out = "Commands: ";
    const cmds = [];

    for (const commandGroup of CommandHandler.commandGroups) {
        commandLoop:
        for (const command of commandGroup.commands) {
            if (command.visible == false) continue commandLoop;
            cmds.push(`${msg.prefix}${command.id}`);
        }
    }

    out += cmds.join(' | ');

    return out;
}, "command.general.help", true);
