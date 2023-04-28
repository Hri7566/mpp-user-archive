console.log("Building userscript...");
console.time("Done userscript");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const generateSourceMap = false;
const isProd = process.env.NODE_ENV == "production";

(async () => {
    const result = await esbuild.build({
        entryPoints: ["src/userscript/index.ts"],
        bundle: true,
        minify: isProd,
        minifySyntax: isProd,
        minifyWhitespace: isProd,
        outfile: "build/mpp-user-archive.js",
        sourcemap: generateSourceMap,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                WEB_PORT: process.env.WEB_PORT,
                SECURE_PORT: process.env.PORT,
                SECURE_WEB_PORT: process.env.WEB_PORT
            })
        },
        metafile: true
    });

    const header = readFileSync("scripts/header.js").toString();
    const full = header + readFileSync("build/mpp-user-archive.js").toString();
    writeFileSync("build/mpp-user-archive.user.js", full);

    if (generateSourceMap) {
        const map = readFileSync("build/mpp-user-archive.js.map");
        writeFileSync("build/mpp-user-archive.user.js.map", map);
    }

    console.log(
        await esbuild.analyzeMetafile(result.metafile, {
            verbose: false,
            color: true
        })
    );
})();

console.timeEnd("Done userscript");
