import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Participant } from "../util/MPP";
import { Server } from "../server";
import { Logger } from "../util/Logger";
import { Context } from "./fastify";
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

// TODO rate limits
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
        .input(
            z.object({
                users: ZParticipant.array(),
                token: z.string().optional()
            })
        )
        .query(async req => {
            return await Server.saveUsers(req.input.users);
        }),

    getNameHistory: t.procedure
        .input(z.object({ id: z.string() }))
        .query(async req => {
            return await Server.getNameHistory(req.input.id);
        }),

    getIDsFromName: t.procedure
        .input(z.object({ name: z.string() }))
        .query(async req => {
            return await Server.getIDsFromName(req.input.name);
        }),

    getUserCount: t.procedure.query(async req => {
        return await Server.getUserCount();
    })
});

export type AppRouter = typeof appRouter;
