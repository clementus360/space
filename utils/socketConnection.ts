import { ParsedUrlQuery } from "querystring";
import { io } from "socket.io-client";

interface RoomInfo {
  type: String;
  roomName?: String;
  userName: String;
}

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function socketInitialization() {
  console.log(process.env.PROD_AWS_URL);
  return io(process.env.PROD_AWS_URL);
  // return io(process.env.DEV_URL);
}

let roomName: String;

async function socketConnection(
  path: ParsedUrlQuery,
  roomInfo: RoomInfo,
  socket
) {
  await socket.emit("client-connected", {
    roomId: path.room,
    roomName: roomInfo.roomName,
    clientType: roomInfo.type,
    clientId: socket.id,
    clientName: roomInfo.userName,
  });
}

export { socketInitialization, socketConnection, roomName };
