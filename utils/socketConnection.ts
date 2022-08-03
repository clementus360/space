import { ParsedUrlQuery } from "querystring";
import { io, Socket } from "socket.io-client";

// const socket = io("http://localhost:5000");
// const socket = io(process.env.HEROKU_URL);
// const socket = io(process.env.CYCLIC_URL);

interface RoomInfo {
  type: String;
  roomName?: String;
  userName: String;
}

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
function socketInitialization() {
  return io(process.env.HEROKU_URL);
}

function socketConnection(path: ParsedUrlQuery, roomInfo: RoomInfo, socket) {
  socket.on("connect", async () => {
    socket.emit("client-connected", {
      roomId: path.room,
      roomName: roomInfo.roomName,
      clientType: roomInfo.type,
      clientId: socket.id,
      clientName: roomInfo.userName,
    });
  });

  socket.on("user-connected", async (message) => {
    console.log(message);
  });
}

export { socketInitialization, socketConnection };
