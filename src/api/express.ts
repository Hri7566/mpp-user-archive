import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import cors from "cors";
import { appRouter } from "./trpc";

const PORT = process.env.PORT || 3000;

export const createContext = ({
    req,
    res
}: trpcExpress.CreateExpressContextOptions) => ({});

export const app = express();

app.use(cors());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
);

app.get("*", (req, res) => {
    res.send({
        status: "online"
    }).end();
});

app.listen(PORT);

export type Context = inferAsyncReturnType<typeof createContext>;
