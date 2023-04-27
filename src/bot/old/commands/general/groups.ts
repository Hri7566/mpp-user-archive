import { Command, CommandHandler } from "../Command";

export const GROUPS = new Command(
    "groups",
    ["groups"],
    (msg, cl) => {
        return `Groups: ${msg.user.groups.join(", ")}`;
    },
    "command.general.groups",
    true
);
