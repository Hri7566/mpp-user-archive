console.log("Bulding...");
console.time("Done all");

require("./build-userscript");
require("./build-server");
require("./build-web");
require("./build-bot");
require("./build-module");

console.timeEnd("Done all");
