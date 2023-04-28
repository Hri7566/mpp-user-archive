(globalThis as unknown as Record<string, unknown>).isNode = true;
console.log("Starting web server...");
console.time("Started");

import { resolve } from "node:path";
import { createReadStream } from "node:fs";
// import express from "express";
import { trpc, webAppRouter } from "./trpc";
import { Logger } from "../util/Logger";
// import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import fastify from "fastify";
import {
    CreateFastifyContextOptions,
    fastifyTRPCPlugin
} from "@trpc/server/adapters/fastify";

import fastifyStatic from "@fastify/static";
import { env } from "./env";
("@fastify/static");

const logger = new Logger("Web Server");

const { WEB_PORT } = process.env;

const app = fastify();

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
    return {};
};

app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: webAppRouter, createContext }
});

const clientPath = resolve(__dirname, "client/");

app.register(fastifyStatic, {
    root: clientPath,
    prefix: "/"
});

app.get("/console", (req, res) => {
    res.sendFile("index.html");
});

const httpServer = app.listen(
    {
        port: parseInt(env.WEB_PORT),
        host: "0.0.0.0"
    },
    err => {
        if (err) return logger.error("Error starting web server:", err);
        logger.info("Web server listening on port " + env.WEB_PORT);
    }
);

trpc.getToken.query().then(t => {
    // logger.info("Token:", t);
});

export type Context = inferAsyncReturnType<typeof createContext>;

console.timeEnd("Started");
