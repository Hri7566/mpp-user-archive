import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../api/trpc";

const { NODE_ENV, PORT } = process.env;

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpLink({
            url:
                NODE_ENV == "production"
                    ? `https://archive.multiplayerpiano.dev:${PORT}`
                    : `http://localhost:${PORT}/trpc`
        })
    ]
});
