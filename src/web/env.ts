import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "PUBLIC",
    server: {},
    client: {},
    runtimeEnv: process.env
});
