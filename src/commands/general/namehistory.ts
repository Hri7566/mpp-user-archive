import { Data } from "../../data";
import { Command, CommandHandler } from "../Command";

export const NAMEHISTORY = new Command("namehistory", ["namehistory", "nh"], async (msg, cl) => {
    if (!msg.argcat) {
        const names = msg.user.nameHistory;
        return `Names: ${names.map(nh => `${nh.name}`).join(', ')}`;
    } else {
        const user = await Data.getUser(msg.argcat);
        if (!user) {
            return `No user found; Use their full _id.`;
        }
        const names = user.nameHistory;
        return `Names: ${names.map(nh => `${nh.name}`).join(', ')}`;
    }
}, "command.general.namehistory", true);
