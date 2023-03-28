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

const getToken = async () => {
    logger.info("Retrieving API token...");
    const apiData = await trpc.getToken.query();
    logger.info("API token retrieved");
    return apiData.token;
};

MPP.client.on("hi", async () => {
    logger.info("Setting up...");
    const server = await trpc.status.query();
    logger.info("Server status:", server.status);

    if (server.status == "offline") {
        return logger.warn("Server offline");
    }

    const token = await getToken();
});

// import "./ui";
import { Logger } from "../util/Logger";
