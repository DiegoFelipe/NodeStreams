import http from "http";

async function handler(req, res) {}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("Running at 3000"));
