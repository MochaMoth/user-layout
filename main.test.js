const main = require("./main.js");

console.log("starting tests...");

const resOne = main();
if (resOne !== "Hello User!") {
    throw new Error("default argument in main returned '" + resOne + "'");
}

const resTwo = main("Main");
if (resTwo !== "Hello Main!") {
    throw new Error("passed argument in main not functioning properly.");
}

