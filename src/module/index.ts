import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";

// FIXME change to t3 env

const env = process.env.NODE_ENV;

module.exports = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url:
                env == "production"
                    ? "https://archive.multiplayerpiano.dev"
                    : "http://localhost:3000/trpc"
        })
    ]
});
