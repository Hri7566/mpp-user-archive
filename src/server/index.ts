(globalThis as unknown as Record<string, unknown>).isNode = true;

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import { prisma } from "../data/prisma";
import { app } from "../api/fastify";
import { Logger } from "../util/Logger";

export class Server {
    public static app = app;
    public static logger = new Logger("Server");

    public static async start() {
        this.logger.info("Server started");
    }
}

Server.start();
