const express = require("express");
const path = require("path");
const config = require("./config");

const app = new express();

app.use(express.static("public"));

app.get("/*", async (req, res) => {
  res.sendfile("views/index.html");
});

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`);
});
