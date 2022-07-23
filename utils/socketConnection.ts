import { ParsedUrlQuery } from "querystring";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
// const socket = io(process.env.HEROKU_URL);
// const socket = io(process.env.CYCLIC_URL);

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function socketInitialization(path: ParsedUrlQuery) {
  socket.on("connect", async () => {
    socket.emit("client-connected", {
      clientId: socket.id,
      roomId: path.room,
    });
  });

  socket.on("user-connected", async (message) => {
    console.log(message);
  });

  socket.on("connection-done", () => {
    console.log("wow");
  });
}

export { socketInitialization };
