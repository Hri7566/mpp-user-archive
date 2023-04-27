import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Participant } from "../util/MPP";
import { Server } from "../server";
import { Logger } from "../util/Logger";
import { Context } from ".";
import { z } from "zod";
import { Bot } from "./bot";
import { env } from "./env";

// our client

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url:
                env.NODE_ENV == "production"
                    ? `https://archive.multiplayerpiano.dev:${env.PORT}/trpc`
                    : `http://localhost:${env.PORT}/trpc`
        })
    ]
});

// our server

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

export const webAppRouter = router({
    status: t.procedure.query(req => {
        return {
            status: "online",
            server: "web"
        };
    }),

    botCommand: t.procedure
        .input(
            z.object({
                command: z.string()
            })
        )
        .query(req => {
            return Bot.handleMessage(req.input.command);
        })
});

export type WebAppRouter = typeof webAppRouter;
