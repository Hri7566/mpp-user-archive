import { createTRPCProxyClient } from "@trpc/client";
import { WebAppRouter } from "../trpc";
import { httpLink } from "@trpc/client";

const env = process.env.NODE_ENV;

export const trpc = createTRPCProxyClient<WebAppRouter>({
    links: [
        httpLink({
            url:
                env == "production"
                    ? "https://archive.multiplayerpiano.dev:8483"
                    : "http://localhost:3080/trpc"
        })
    ]
});
