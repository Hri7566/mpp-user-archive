import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "",
    server: {
        NODE_ENV: z.string(),
        WEB_PORT: z.string(),
        PORT: z.string()
    },
    client: {
        NODE_ENV: z.string(),
        WEB_PORT: z.string()
    },
    runtimeEnvStrict: {
        NODE_ENV: process.env.NODE_ENV,
        WEB_PORT: process.env.WEB_PORT,
        PORT: process.env.PORT
    }
});
