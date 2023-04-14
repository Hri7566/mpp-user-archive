import type { MPP as TMPP, Participant } from "./typings/MPP";
import { Logger } from "../util/Logger";
import { trpc } from "./client";

const MPP = (globalThis as any).MPP as TMPP;
const logger = new Logger("Data Service");
const DATA_INTERVAL = 3000;

let dataInterval: ReturnType<typeof setInterval>;
let collecting = false;

export const startDataCollection = async (apiToken: string) => {
    collecting = true;

    dataInterval = setInterval(() => {
        collectData();
    }, DATA_INTERVAL);

    collectData();

    logger.info("Collection service started");
};

export const stopDataCollection = async () => {
    logger.info("Stopping service");
    collecting = false;
    clearInterval(dataInterval);
};

export const collectData = async () => {
    if (!MPP.client.channel.settings.visible) return;
    trpc.sendUsers.query({
        users: [...Object.values(MPP.client.ppl)]
    });
};

MPP.client.on("participant added", (p: Participant) => {
    if (!collecting) return;

    trpc.sendUsers.query({
        users: [p]
    });
});

MPP.client.on("participant update", (p: Participant) => {
    if (!collecting) return;

    trpc.sendUsers.query({
        users: [p]
    });
});
