(globalThis as unknown as Record<string, unknown>).isNode = true;

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import { prisma } from "../data/prisma";
import { app } from "../api/fastify";
import { Logger } from "../util/Logger";
import { IDCrypto } from "./IDCrypto";

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
}

Server.start();
