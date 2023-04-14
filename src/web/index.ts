(globalThis as unknown as Record<string, unknown>).isNode = true;
console.log("Starting web server...");
console.time("Started");

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import { resolve } from "node:path";
import express from "express";
import { trpc } from "./trpc";
import { Logger } from "../util/Logger";

const logger = new Logger("Web Server");

const { WEB_PORT } = process.env;

const app = express();

const path = resolve(__dirname, "client/");
logger.debug(path);

app.use(express.static(path));

const httpServer = app.listen(WEB_PORT, () => {
    logger.info("Web server listening on port " + WEB_PORT);
});

trpc.getToken.query().then(t => {
    logger.info("Token:", t);
});

console.timeEnd("Started");
