import type { MPP as TMPP } from "./MPP";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc"
        })
    ]
});

const MPP = (globalThis as any).MPP as TMPP;

if (!MPP) {
    throw `Error: No MPP API detected`;
}

const logger = new Logger("tRPC");

MPP.client.on("hi", async () => {
    logger.info("Setting up...");
    const status = trpc.status.query();
});

import "./ui";
import { Logger } from "../util/Logger";
