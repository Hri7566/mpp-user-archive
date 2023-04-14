import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";

const env = process.env.NODE_ENV;

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url:
                env == "production"
                    ? "https://archive.multiplayerpiano.dev"
                    : "http://localhost:3000/trpc"
        })
    ]
});