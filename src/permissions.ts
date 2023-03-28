import type { PermissionGroup } from "./data/idb";

export class Permissions {
    public static groups: PermissionGroup[] = [
        {
            id: "user",
            permissions: [
                "command.general.*",
                "command.util.color",
                "command.util.math"
            ]
        },
        {
            id: "admin",
            permissions: ["command.*", "command.*"]
        }
    ];

    public static resolvePermission(node1: string, node2: string) {
        const p1 = node1.split(".");
        const p2 = node2.split(".");

        for (const sec1 of p1) {
            const i = p1.indexOf(sec1);
            if (sec1 == "*" || p2[i] == "*") return true;
            if (sec1 !== p2[i]) return false;
        }

        return true;
    }

    public static testGroupPermission(groups: string[], node: string) {
        groupLoop: for (const groupstr of groups) {
            const group = this.groups.find(g => g.id == groupstr);
            if (!group) continue;

            for (const node2 of group.permissions) {
                if (this.resolvePermission(node, node2)) return true;
            }
        }

        return false;
    }
}
