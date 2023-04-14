console.log("Building server...");
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
        metafile: true
    });
})();

console.timeEnd("Done module");
