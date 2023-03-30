console.log("Bulding...");
console.time("Done all");

require("./build-userscript");
require("./build-server");
require("./build-web");

console.timeEnd("Done all");
