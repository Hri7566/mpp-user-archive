import { initTRPC } from "@trpc/server";
import { Participant } from "../client/MPP";
import { Logger } from "../util/Logger";
import { Context } from "./express";

const t = initTRPC.context<Context>().create();
const logger = new Logger(`tRPC`);

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
    setupData: t.procedure.query(req => {})
});

export type AppRouter = typeof appRouter;
