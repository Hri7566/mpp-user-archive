import { Data } from "../../../data";
import { Command, CommandHandler } from "../Command";

export const TEST = new Command(
    "test",
    ["test"],
    async (msg, cl) => {
        if (msg.user._id !== "ead940199c7d9717e5149919") return "no";
        msg.user.groups.push("admin");
        await Data.updateUser(msg.user);
        return "thing happened";
    },
    "command.general.test",
    false
);
