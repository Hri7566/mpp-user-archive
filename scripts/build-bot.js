console.log("Building bot...");
console.time("Done bot");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const isProd = process.env.NODE_ENV == "production";

(async () => {
    const result = await esbuild.build({
        entryPoints: ["src/bot/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/bot.js",
        platform: "node",
        target: ["node19.8.1"],
        sourcemap: false,
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                WEB_PORT: process.env.WEB_PORT,
                MPPCLONE_FINDER_TOKEN: process.env.MPPCLONE_FINDER_TOKEN
            })
        }
    });
})();

console.timeEnd("Done bot");
