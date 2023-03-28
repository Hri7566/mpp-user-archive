import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./api/trpc";
import { createContext } from "./api/express";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const PORT = process.env.PORT || 3000;

const app = express();
import * as cors from "cors";
import { prisma } from "./data/prisma";
import { Logger } from "./util/Logger";

app.use(cors.default());

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

const logger = new Logger(`Server`);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
});
