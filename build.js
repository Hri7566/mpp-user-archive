const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

(async () => {
    await esbuild.build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/raw.js"
    });

    const header = readFileSync("header.js").toString();
    const full = header + readFileSync("build/raw.js").toString();
    writeFileSync("build/mpp-browser-bot.user.js", full);
})();
