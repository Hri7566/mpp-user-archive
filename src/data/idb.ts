import { get, set, del, update, clear } from "idb-keyval";
import { CommandHandler } from "../bot/commands/Command";
import { Permissions } from "../userscript/permissions";
import type { ChatMessage, Participant } from "../userscript/typings/MPP";

const USERID_KEY_PREFIX = `user-`;

export interface NameHistoryBlob {
    name: string;
    date: number;
}

export interface User {
    _id: string;
    name: string;
    color: string;
    nameHistory: NameHistoryBlob[];
    groups: string[];
}

export interface PermissionGroup {
    id: string;
    permissions: string[];
}

export interface CommandMessage extends ChatMessage {
    prefix: string;
    user: User;
}

export class Data {
    public static async start() {
        const prefixes = await get("prefixes");

        if (prefixes) {
            CommandHandler.prefixes = prefixes;
        } else {
            await set("prefixes", CommandHandler.prefixes || []);
        }

        const groups = await get("groups");

        if (groups) {
            Permissions.groups = groups;
        } else {
            await set("groups", Permissions.groups || []);
        }
    }

    public static async addPrefix(prefix: string) {
        update("prefixes", (old: string[] | undefined) => {
            if (!old) old = [];
            old.push(prefix);
            return old;
        });
    }

    public static async getUser(_id: string): Promise<User | undefined> {
        return await get(this.getUserKey(_id));
    }

    public static async setUser(_id: string, data: User) {
        return await set(this.getUserKey(_id), data);
    }

    public static async updateUser(data: User) {
        return await update(
            this.getUserKey(data._id),
            (old: User | undefined) => {
                if (!old) {
                    this.setUser(this.getUserKey(data._id), data);
                    return data;
                } else {
                    return data;
                }
            }
        );
    }

    public static async deleteUser(_id: string) {
        return await del(this.getUserKey(_id));
    }

    public static getUserKey(_id: string) {
        return `${USERID_KEY_PREFIX}${_id}`;
    }

    public static async createDefaultUser(p: Participant) {
        return await Data.setUser(p._id, {
            _id: p._id,
            name: p.name,
            color: p.color,
            groups: ["user"],
            nameHistory: [{ name: p.name, date: Date.now() }]
        });
    }

    public static async addNameHistory(
        _id: string,
        name: string,
        date: number = Date.now()
    ) {
        const user = await this.getUser(_id);
        if (!user) return;
        user.nameHistory.push({ name, date });
        await this.updateUser(user);
    }

    public static async getNameHistory(_id: string, name: string) {
        const user = await this.getUser(_id);
        if (!user) return;
        return user.nameHistory.find(nh => nh.name == name);
    }
}
