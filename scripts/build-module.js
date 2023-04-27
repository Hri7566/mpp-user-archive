console.log("Building module...");
console.time("Done module");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const isProd = process.env.NODE_ENV == "production";

(async () => {
    const result = await esbuild.build({
        entryPoints: ["src/module/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/module.js",
        platform: "node",
        target: ["node19.8.1"],
        sourcemap: false,
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                WEB_PORT: process.env.WEB_PORT
            })
        }
    });
})();

console.timeEnd("Done module");
