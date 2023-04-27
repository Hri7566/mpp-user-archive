import { createTRPCProxyClient } from "@trpc/client";
import { WebAppRouter } from "../trpc";
import { httpLink } from "@trpc/client";
import { env } from "../env";

export const trpc = createTRPCProxyClient<WebAppRouter>({
    links: [
        httpLink({
            url:
                env.NODE_ENV == "production"
                    ? `https://archive.multiplayerpiano.dev:${env.WEB_PORT}`
                    : `http://localhost:${env.WEB_PORT}/trpc`
        })
    ]
});
