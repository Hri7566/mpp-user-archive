const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

(async () => {
    await esbuild.build({
        entryPoints: ["src/server/index.ts"],
        bundle: true,
        minify: true,
        minifySyntax: true,
        minifyWhitespace: true,
        outfile: "build/server.js",
        platform: "node",
        target: ["node19.8.1"],
        sourcemap: false
    });
})();
