import {
  types,
  version,
  Device,
  detectDevice,
  parseScalabilityMode,
  debug,
} from "mediasoup-client";

import { Producer, RtpParameters } from "mediasoup-client/lib/types";
import DevServer from "next/dist/server/dev/next-dev-server";

let producer: Producer;
let rtpParameters: RtpParameters;

let device;

function deviceInitialization() {
  try {
    device = new Device();
  } catch (error) {
    if (error.name === "UnsupportedError") {
      console.log("unsupported device");
    } else {
      console.log("error initiating devce");
    }
  }
  return device;
}

function soup(socket) {
  socket.on("rtp-capabilities", async (rtp) => {
    console.log(rtp);
    let routerRtpCapabilities = rtp;
    try {
      if (!device.loaded) await device.load({ routerRtpCapabilities });
    } catch (err) {
      console.log(err);
    }
  });
}

export { soup, deviceInitialization };
