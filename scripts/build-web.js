console.log("Building web...");
console.time("Done web");

require("dotenv").config();
const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const postCssPlugin = require("esbuild-style-plugin");

const isProd = process.env.NODE_ENV == "production";

(async () => {
    const serverResult = await esbuild.build({
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
        format: "cjs",
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                WEB_PORT: process.env.WEB_PORT,
                SECURE_PORT: process.env.PORT,
                SECURE_WEB_PORT: process.env.WEB_PORT
            })
        }
    });

    const clientResult = await esbuild.build({
        entryPoints: ["src/web/client/index.tsx"],
        bundle: true,
        outdir: "build/web/client/",
        platform: "browser",
        target: ["chrome58"],
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                WEB_PORT: process.env.WEB_PORT,
                SECURE_PORT: process.env.SECURE_PORT,
                SECURE_WEB_PORT: process.env.SECURE_WEB_PORT
            })
        },
        plugins: [
            htmlPlugin({
                files: [
                    {
                        entryPoints: ["src/web/client/index.tsx"],
                        filename: "index.html",
                        htmlTemplate: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="root">
                </div>
            </body>
            </html>`
                    }
                ]
            }),
            postCssPlugin({
                postcss: {
                    plugins: [require("tailwindcss"), require("autoprefixer")]
                }
            })
        ]
    });
})();

console.timeEnd("Done web");
