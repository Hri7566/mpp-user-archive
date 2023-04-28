import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";
import { env } from "./env";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url:
                env.NODE_ENV == "production"
                    ? `https://archive.hri7566.info:${env.PORT}`
                    : `http://localhost:${env.PORT}/trpc`
        })
    ]
});
