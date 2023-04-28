import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "",
    server: {},
    client: {
        NODE_ENV: z.string(),
        PORT: z.string(),
        SECURE_PORT: z.string()
    },
    runtimeEnvStrict: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        SECURE_PORT: process.env.SECURE_PORT
    }
});
