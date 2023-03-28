import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import {
    fastifyTRPCPlugin,
    CreateFastifyContextOptions
} from "@trpc/server/adapters/fastify";

const PORT = parseInt((process.env as any).PORT as string) || 3000;

export const app = Fastify();

function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = { name: req.headers.username ?? "anonymous" };
    return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

(async () => {
    await app.register(cors);
    await app.register(fastifyTRPCPlugin, {
        prefix: "/trpc",
        trpcOptions: { router: appRouter, createContext }
    });

    app.get("/", (req, reply) => {
        reply.send({ status: "online" });
    });

    await app.listen({
        port: PORT
    });
})();
