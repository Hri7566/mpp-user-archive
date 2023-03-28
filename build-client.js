const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

(async () => {
    await esbuild.build({
        entryPoints: ["src/client.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/client.js",
        sourcemap: true
    });

    const header = readFileSync("header.js").toString();
    const full = header + readFileSync("build/client.js").toString();
    writeFileSync("build/mpp-browser-bot.user.js", full);

    const map = readFileSync("build/client.js.map");
    writeFileSync("build/mpp-browser-bot.user.js.map", map);
})();
