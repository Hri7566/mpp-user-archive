import { initTRPC } from "@trpc/server";
import { Participant } from "../client/MPP";
import { Server } from "../server";
import { Logger } from "../util/Logger";
import { Context } from "./express";

const t = initTRPC.context<Context>().create();
const logger = new Logger(`tRPC`);

const router = t.router;
const publicProcedure = t.procedure;

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
    })
});

export type AppRouter = typeof appRouter;
