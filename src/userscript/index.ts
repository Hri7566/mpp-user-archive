import type { MPP as TMPP } from "./typings/MPP";

const MPP = (globalThis as any).MPP as TMPP;

if (!MPP) {
    throw `Error: No MPP API detected`;
}

const logger = new Logger("User Archive Client");

const getToken = async () => {
    logger.info("Retrieving API token...");
    const apiData = await trpc.getToken.query();
    logger.info("API token retrieved");
    return apiData.token;
};

const start = async () => {
    logger.info("Setting up...");

    try {
        const server = await trpc.status.query();
        logger.info("Server status:", server.status);
    } catch (err) {
        return logger.warn("Unable to connect to server, reload to reconnect");
    }

    const apiToken = await getToken();

    if (Settings.enableArchive) {
        startDataCollection(apiToken);
    }
};

export const reload = async () => {
    logger.info("Reloading...");
    start();
};

MPP.client.on("hi", async () => {
    reload();
});

MPP.client.on("disconnect", async () => {
    logger.info("Lost connection to MPP server");
    stopDataCollection();
});

import "./ui";
import { Logger } from "../util/Logger";
import { startDataCollection, stopDataCollection } from "./data";
import { trpc } from "./client";
import { Settings } from "./settings";
