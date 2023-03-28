import { initTRPC } from "@trpc/server";
import { Participant } from "../MPP";
import { Logger } from "../util/Logger";
import { Context } from "./express";

const t = initTRPC.context<Context>().create();
const logger = new Logger(`tRPC`);

const router = t.router;
const publicProcedure = t.procedure;

const defaultUser: Partial<Participant> = {
    name: "๖ۣۜH͜r̬i͡7566",
    color: "#8d3f50"
};

export const appRouter = router({
    defaultUser: t.procedure.query(req => {
        logger.debug("Received client request");
        logger.debug(req.ctx);
        return defaultUser;
    })
});

export type AppRouter = typeof appRouter;
