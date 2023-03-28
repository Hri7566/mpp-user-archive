import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import {
    fastifyTRPCPlugin,
    CreateFastifyContextOptions
} from "@trpc/server/adapters/fastify";
import { IDCrypto } from "../server/IDCrypto";

const PORT = parseInt((process.env as any).PORT as string) || 3000;

export const app = Fastify();

function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = { name: req.headers.username ?? "anonymous" };
    const api_id = IDCrypto.generateAPIHash(req.ip);
    return { req, api_id, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

app.register(cors);
app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext }
});

app.get("/", (req, reply) => {
    return { status: "online" };
});

app.listen({
    port: PORT
});
