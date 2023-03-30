import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Participant } from "../userscript/typings/MPP";
import { Server } from "../server";
import { Logger } from "../util/Logger";
import { Context } from "./express";
import { z } from "zod";

const t = initTRPC.context<Context>().create();
const logger = new Logger(`tRPC`);

const router = t.router;
const publicProcedure = t.procedure;

const ZParticipant = z.object({
    _id: z.string(),
    id: z.string(),
    name: z.string(),
    color: z.string(),
    tag: z
        .object({
            text: z.string(),
            color: z.string()
        })
        .optional()
});

export const appRouter = router({
    status: t.procedure.query(req => {
        return {
            status: "online"
        };
    }),

    getToken: t.procedure.query(req => {
        const id = (req.ctx as any).api_id;
        return Server.getToken(id);
    }),

    resetToken: t.procedure.query(req => {
        const id = (req.ctx as any).api_id;
        return Server.generateToken(id);
    }),

    sendUsers: t.procedure
        .input(z.object({ users: ZParticipant.array() }))
        .query(async req => {
            // console.log(req.input.users);
            // TODO rate limits
            return await Server.saveUsers(req.input.users);
        }),

    getNameHistory: t.procedure
        .input(z.object({ id: z.string() }))
        .query(async req => {
            return await Server.getNameHistory(req.input.id);
        })
});

export type AppRouter = typeof appRouter;
