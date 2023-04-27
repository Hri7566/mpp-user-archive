console.log("Building server...");
console.time("Done server");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const isProd = process.env.NODE_ENV == "production";

(async () => {
    const result = await esbuild.build({
        entryPoints: ["src/server/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/server.js",
        platform: "node",
        target: ["node19.8.1"],
        sourcemap: false,
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                API_SALT: process.env.API_SALT
            })
        }
    });

    // console.log(
    //     await esbuild.analyzeMetafile(result.metafile, {
    //         verbose: false,
    //         color: true
    //     })
    // );
})();

console.timeEnd("Done server");
