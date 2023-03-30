console.log("Building web...");
console.time("Done web");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const isProd = process.env.NODE_ENV == "production";

(async () => {
    const result = await esbuild.build({
        entryPoints: ["src/web/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outdir: "build/web",
        platform: "node",
        target: ["node19.8.1"],
        sourcemap: false,
        metafile: true,
        format: "cjs"
    });
})();

console.timeEnd("Done web");
