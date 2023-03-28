const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const generateSourceMap = false;

(async () => {
    await esbuild.build({
        entryPoints: ["src/client/index.ts"],
        bundle: true,
        minify: true,
        minifySyntax: true,
        minifyWhitespace: true,
        outfile: "build/mpp-user-archive.js",
        sourcemap: generateSourceMap
    });

    const header = readFileSync("scripts/header.js").toString();
    const full = header + readFileSync("build/mpp-user-archive.js").toString();
    writeFileSync("build/mpp-user-archive.user.js", full);

    if (generateSourceMap) {
        const map = readFileSync("build/mpp-user-archive.js.map");
        writeFileSync("build/mpp-user-archive.user.js.map", map);
    }
})();
