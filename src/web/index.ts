(globalThis as unknown as Record<string, unknown>).isNode = true;
console.log("Starting web server...");
console.time("Started");

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import { resolve } from "node:path";
import express from "express";
import { trpc, webAppRouter } from "./trpc";
import { Logger } from "../util/Logger";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = ({
    req,
    res
}: trpcExpress.CreateExpressContextOptions) => ({});

const logger = new Logger("Web Server");

const { WEB_PORT } = process.env;

const app = express();

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: webAppRouter,
        createContext
    })
);


const clientPath = resolve(__dirname, "client/");
logger.debug(clientPath);
const reg = express.static(clientPath);

app.use(reg);

app.get("*", (req, res, next) => {
    if (req.url.includes(".") || req.url == "/") {
        next();
    } else {
        res.sendFile(resolve(clientPath, "index.html"));
    }
});

const httpServer = app.listen(WEB_PORT, () => {
    logger.info("Web server listening on port " + WEB_PORT);
});

trpc.getToken.query().then(t => {
    logger.info("Token:", t);
});

export type Context = inferAsyncReturnType<typeof createContext>;

console.timeEnd("Started");
