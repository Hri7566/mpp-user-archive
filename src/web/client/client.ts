import { createTRPCProxyClient } from "@trpc/client";
import { WebAppRouter } from "../trpc";
import { httpLink } from "@trpc/client";

const { NODE_ENV, WEB_PORT } = process.env;

export const trpc = createTRPCProxyClient<WebAppRouter>({
    links: [
        httpLink({
            url:
                NODE_ENV == "production"
                    ? `https://archive.multiplayerpiano.dev:${WEB_PORT}`
                    : `http://localhost:${WEB_PORT}/trpc`
        })
    ]
});
