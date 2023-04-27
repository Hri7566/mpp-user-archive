import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "",
    server: {
        MPPCLONE_FINDER_TOKEN: z.string(),
        PORT: z.string()
    },
    client: {},
    runtimeEnvStrict: {
        MPPCLONE_FINDER_TOKEN: process.env.MPPCLONE_FINDER_TOKEN,
        PORT: process.env.PORT
    }
});
