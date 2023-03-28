import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

const app = express();

app.get("*", (req, res) => {
    res.send({
        status: "online"
    }).end();
});

export const createContext = ({
    req,
    res
}: trpcExpress.CreateExpressContextOptions) => ({});

export type Context = inferAsyncReturnType<typeof createContext>;
