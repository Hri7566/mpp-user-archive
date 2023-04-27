import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "",
    server: {
        NODE_ENV: z.string(),
        API_SALT: z.string()
    },
    client: {
        NODE_ENV: z.string(),
        PORT: z.string()
    },
    runtimeEnvStrict: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        API_SALT: process.env.API_SALT
    }
});
