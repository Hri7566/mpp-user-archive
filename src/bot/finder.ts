import { trpc } from "../userscript/client";
import { Logger } from "../util/Logger";
import type {
    InboundChatMessage,
    Participant,
    MPP as TMPP,
    Client,
    InboundHiMessage,
    InboundListMessage,
    InboundChannelMessage
} from "../util/MPP";
import { env } from "./env";
import { default as MPPClient } from "mpp-client-net";

export const client = new MPPClient(
    "wss://mppclone.com:8443",
    env.MPPCLONE_FINDER_TOKEN
);

const sendUsers = (msg: InboundChannelMessage) => {
    logger.debug("Connected to " + msg.ch._id);
    trpc.sendUsers.query({
        users: msg.ppl
    });
};

export const startSearch = () => {
    if (!client.ws) client.start();

    client.sendArray([{ m: "+ls" }]);
    let channels = [];
    client.once("ls", (msg: InboundListMessage) => {
        client.sendArray([{ m: "-ls" }]);
        if (!msg.c) return;

        let time = 0;
        for (const channel of msg.u) {
            // console.log(time);
            if (channel.banned) continue;
            if (channel.settings.noindex) continue;
            if (channel.count > (channel.settings.limit as number)) continue;
            setTimeout(() => {
                logger.debug("Connecting to " + channel._id);
                client.setChannel(channel._id);
            }, time * 1000);
            time++;
        }

        setTimeout(() => {
            logger.debug("Returning to ban channel");
            client.off("ch", sendUsers);
            client.setChannel("test/awkward");
        }, time * 1000);
    });

    client.on("ch", msg => {
        sendUsers(msg as unknown as InboundChannelMessage);
    });
};

const logger = new Logger("Finder");

client.once("hi", (msg: InboundHiMessage) => {
    logger.info("Connected to MPPClone");

    startSearch();
    setInterval(() => {
        startSearch();
    }, 5 * 60 * 1000);
});

// client.start();
