(globalThis as unknown as Record<string, unknown>).isNode = true;
console.log("Starting server...");
console.time("Started");

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import { prisma } from "../data/prisma";
import { app } from "../api/fastify";
import { Logger } from "../util/Logger";
import { IDCrypto } from "./IDCrypto";
import type { Participant } from "../util/MPP";

interface Status {
    status: string;
}

interface ErrorStatus extends Status {
    error: string;
}

interface DataStatus<T> extends Status {
    data: T;
}

export class Server {
    public static app = app;
    public static logger = new Logger("Server");

    public static async start() {
        this.logger.info("Server started");

        this.app.get("/resettoken", async (req, reply) => {
            const id = IDCrypto.generateAPIHash(req.ip);
            this.generateToken(id);
        });

        this.app.get("/gettoken", async (req, reply) => {
            const id = IDCrypto.generateAPIHash(req.ip);
            return this.getToken(id);
        });
    }

    public static async generateToken(id: Buffer) {
        return {
            token: await IDCrypto.generateAPIToken(id)
        };
    }

    public static async getToken(id: Buffer) {
        const data = await prisma.apiAuth.findUnique({
            where: {
                addressHash: id
            }
        });

        if (data) {
            if (data.token == "") {
                return {
                    token: await IDCrypto.generateAPIToken(id)
                };
            }
        } else {
            return {
                token: await IDCrypto.generateAPIToken(id)
            };
        }

        return {
            token: data.token
        };
    }

    public static async saveUsers(users: Participant[]) {
        const oldUsers: string[] = [];
        const newUsers: string[] = [];

        try {
            for (const user of users) {
                let duser = await prisma.user.findFirst({
                    where: {
                        mppUserId: user._id
                    }
                });

                if (duser == null) {
                    try {
                        duser = await prisma.user.create({
                            data: {
                                mppUser: {
                                    connectOrCreate: {
                                        create: {
                                            id: user._id,
                                            name: user.name,
                                            color: user.color,
                                            lastSeen: new Date()
                                        },
                                        where: {
                                            id: user._id
                                        }
                                    }
                                },
                                nameHistory: {
                                    create: {
                                        names: [
                                            { name: user.name, t: Date.now() }
                                        ]
                                    }
                                },
                                ColorHistory: {
                                    create: {
                                        colors: [
                                            { color: user.color, t: Date.now() }
                                        ]
                                    }
                                },
                                TagHistory: {
                                    create: {
                                        tags: user.tag
                                            ? [{ tag: user.tag, t: Date.now() }]
                                            : []
                                    }
                                }
                            }
                        });

                        newUsers.push(user._id);
                    } catch (err) {
                        this.logger.warn(err);
                        continue;
                    }
                } else {
                    oldUsers.push(user._id);
                }

                const nameHistory = await prisma.nameHistory.findUnique({
                    where: {
                        id: duser.nameHistoryId
                    }
                });

                if (!nameHistory) continue;

                const existingName = (
                    nameHistory.names as { name: string; t: number }[]
                ).find(h => h.name == user.name);

                if (!existingName) {
                    (nameHistory.names as { name: string; t: number }[]).push({
                        name: user.name,
                        t: Date.now()
                    });

                    await prisma.nameHistory.update({
                        where: {
                            id: nameHistory.id
                        },
                        data: {
                            names: nameHistory.names as {
                                name: string;
                                t: number;
                            }[]
                        }
                    });
                }

                const colorHistory = await prisma.colorHistory.findUnique({
                    where: {
                        id: duser.colorHistoryId as number
                    }
                });

                if (!colorHistory) continue;

                const existingColor = (
                    nameHistory.names as { name: string; t: number }[]
                ).find(h => h.name == user.name);

                if (!existingColor) {
                    (
                        colorHistory.colors as { color: string; t: number }[]
                    ).push({
                        color: user.color,
                        t: Date.now()
                    });

                    await prisma.colorHistory.update({
                        where: {
                            id: colorHistory.id
                        },
                        data: {
                            colors: colorHistory.colors as {
                                color: string;
                                t: number;
                            }[]
                        }
                    });
                }

                const tagHistory = await prisma.tagHistory.findUnique({
                    where: {
                        id: duser.tagHistoryId as number
                    }
                });

                if (!tagHistory) continue;

                const existingTag = (
                    tagHistory.tags as {
                        tag: { text: string; color: string };
                        t: number;
                    }[]
                ).find(h => {
                    if (typeof user.tag !== "undefined" && h.tag) {
                        return (
                            h.tag.text == user.tag.text &&
                            h.tag.color == user.tag.color
                        );
                    } else {
                        return false;
                    }
                });

                if (!existingTag && typeof user.tag !== "undefined") {
                    (
                        tagHistory.tags as {
                            tag: { text: string; color: string };
                            t: number;
                        }[]
                    ).push({
                        tag: user.tag,
                        t: Date.now()
                    });

                    await prisma.tagHistory.update({
                        where: {
                            id: tagHistory.id
                        },
                        data: {
                            tags: tagHistory.tags as {
                                tag: string;
                                t: number;
                            }[]
                        }
                    });
                }
            }

            if (newUsers.length > 0)
                this.logger.info(
                    "Received new user data for the following IDs:",
                    newUsers.join(", ")
                );
        } catch (err) {
            this.logger.error(err);
            return false;
        }
    }

    public static async getNameHistory(
        mppUserId: string
    ): Promise<ErrorStatus | DataStatus<string[]>> {
        const user = await prisma.user.findFirst({
            where: {
                mppUserId
            }
        });

        if (user == null) {
            return {
                status: "error",
                error: "Not found"
            };
        }

        const nameHistory = await prisma.nameHistory.findUnique({
            where: {
                id: user.nameHistoryId
            }
        });

        if (!nameHistory) {
            return {
                status: "error",
                error: "User has no name history"
            };
        }

        try {
            return {
                status: "ok",
                data: (nameHistory.names as { name: string; t: number }[]).map(
                    hist => hist.name
                )
            };
        } catch (err) {
            return {
                status: "error",
                error: err as string
            };
        }
    }

    public static async getIDsFromName(
        name: string
    ): Promise<ErrorStatus | DataStatus<string[]>> {
        let nameHistories;
        try {
            nameHistories = await prisma.nameHistory.findMany({
                where: {
                    names: {
                        path: "$[*].name",
                        array_contains: name
                    }
                }
            });
        } catch (err) {
            this.logger.error(err);
            return {
                status: "error",
                error: "Unable to fetch users"
            };
        }

        // this.logger.debug(nameHistories);
        if (!nameHistories)
            return {
                status: "error",
                error: "Not found"
            };

        const users = await prisma.user.findMany({
            where: {
                nameHistoryId: {
                    in: nameHistories.map(nh => nh.id)
                }
            }
        });

        return {
            status: "ok",
            data: users.map(u => u.mppUserId)
        };
    }

    public static async getUserCount() {
        return await prisma.mppUser.count();
    }
}

Server.start();

console.timeEnd("Started");
