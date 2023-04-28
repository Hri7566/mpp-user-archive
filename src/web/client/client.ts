import { createTRPCProxyClient } from "@trpc/client";
import { WebAppRouter } from "../trpc";
import { httpLink } from "@trpc/client";
import { env } from "../env";

export const trpc = createTRPCProxyClient<WebAppRouter>({
    links: [
        httpLink({
            url:
                env.NODE_ENV == "production"
                    ? `https://archive.hri7566.info:${env.WEB_PORT}/trpc`
                    : `http://localhost:${env.WEB_PORT}/trpc`
        })
    ]
});
