import { Permissions } from "../../permissions";
import { Command, CommandHandler } from "../Command";

export const PERMS = new Command(
    "perms",
    ["perms"],
    (msg, cl) => {
        const perms: string[] = [];
        for (const gid of msg.user.groups) {
            let group = Permissions.groups.find(g => g.id == gid);
            if (!group) continue;
            for (const perm of group.permissions) {
                // if (perms.indexOf(perm) == -1) {
                perms.push(perm);
                // }
            }
        }
        return `Permissions: ${perms.join(", ").replace(/\*.*?(\*)/, "\\*")}`;
    },
    "command.general.perms",
    false
);
