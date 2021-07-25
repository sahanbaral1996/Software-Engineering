import express from "express";
import routes from "./api";
import { Server } from "socket.io";
import os from "os";

const app = express();
app.use("/api", routes());
const servIns = app.listen(1134, () => {
  console.log(`
      ################################################
      🛡️  Server listening on port: 8000 🛡️
      ################################################
    `);
});

let numClient = 0;

const io = new Server(servIns, { cors: { origin: "*" } });

const workspaces = io.of(/^\/\w+$/);
workspaces.on("connection", function (socket) {
  if (numClient == 2 || numClient > 2) {
    console.log("emitted");
    socket.emit("other-user", "2 user");
  }

  if (numClient == 1) {
    console.log("emitted");
    socket.emit("other-user-1", "1 user");
  }
  numClient += 1;
  console.log(numClient);

  socket.emit("num-connection", numClient);

  socket.on("disconnect-user", (msg) => {
    numClient -= 1;

    socket.disconnect();
    console.log("closed");
  });

  socket.on("chat-message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("reply", msg);
  });

  socket.on("ipaddr", function () {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev]!.forEach(function (details) {
        if (details.family === "IPv4" && details.address !== "127.0.0.1") {
          socket.emit("ipaddr", details.address);
        }
      });
    }
  });

  socket.on("offer", (payload) => {
    console.log("offer");
    socket.broadcast.emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    console.log("answer");
    socket.broadcast.emit("answer", payload);
  });
  socket.on("ice-candidate", (incoming) => {
    console.log("ice-candidate");
    socket.broadcast.emit("ice-candidate", incoming);
  });
  socket.on("bye", function () {
    console.log("received bye");
  });
});
export default app;
