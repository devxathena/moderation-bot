require("dotenv").config();
const fs = require("fs");
const clientXATHENA = require('./client/client');
const client = new clientXATHENA();
const { QuickDB } = require('quick.db');
const db = new QuickDB();
global.db = db;

require("./utils/handler")(client, fs);

client.login(process.env.TOKEN);

client.once("reconnecting", () => {
    console.log(" Reconnecting...");
});

client.once("disconnect", () => {
    console.log(" Offline!");
});

client.on("error", (e) => console.error(" Error! " + e));

client.on("warn", (e) => console.warn(" Warning! " + e));

client.on("shardError", (e) => {
    console.error(" shardError! " + e);
});