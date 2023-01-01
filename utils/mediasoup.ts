import {
  types,
  version,
  Device,
  detectDevice,
  parseScalabilityMode,
  debug,
} from "mediasoup-client";

import { Producer, Consumer, Transport } from "mediasoup-client/lib/types";
import { Stream } from "stream";

let videoProducer: Producer;
let consumer: Consumer;
let sndTransport: Transport;
let rcvTransport: Transport;

let device: Device;

const deviceInitialization = async (message, socket) => {
  try {
    device = new Device();

    await device
      .load({ routerRtpCapabilities: message.rtpCapabilities })
      .then(async () => {
        // Creating transports
        sndTransport = device.createSendTransport({
          id: message.sndTransport,
          iceParameters: message.sndTransportIceParameters,
          iceCandidates: message.sndTransportIceCandidates,
          dtlsParameters: message.sndTransportDtlsParameters,
        });
        rcvTransport = device.createRecvTransport({
          id: message.rcvTransport,
          iceParameters: message.rcvTransportIceParameters,
          iceCandidates: message.rcvTransportIceCandidates,
          dtlsParameters: message.rcvTransportDtlsParameters,
        });

        sndTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            console.log("1");
            // Signal local DTLS parameters to the server side transport.
            try {
              socket.emit("snd-parameters", {
                parameters: dtlsParameters,
              });
              callback();
            } catch (error) {
              errback(error);
              // Tell the transport that something was wrong.
              throw error;
            }
          }
        );

        rcvTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            console.log("it just works");
            // Signal local DTLS parameters to the server side transport.
            try {
              socket.emit("rcv-parameters", {
                parameters: dtlsParameters,
              });
              callback();
            } catch (error) {
              // Tell the transport that something was wrong.
              errback(error);
              throw error;
            }
          }
        );
      });
  } catch (error) {
    if (error.name === "UnsupportedError") {
      console.log("unsupported device");
    } else {
      console.log(error);
      console.log("error initiating devce");
    }
  }
  return device;
};

const producerInitialization = async (stream: MediaStream, socket) => {
  const videoTrack = stream.getVideoTracks()[0];

  sndTransport.on("produce", async (parameters) => {
    console.log("2");
    // Signal parameters to the server side transport and retrieve the id of
    // the server side new producer.
    try {
      socket.emit("video-producer-parameters", {
        transportId: sndTransport.id,
        kind: parameters.kind,
        rtpParameters: parameters.rtpParameters,
        appData: parameters.appData,
        rtpCapabilities: device.rtpCapabilities,
      });
    } catch (error) {
      // Tell the transport that something was wrong.
      throw error;
    }
  });

  videoProducer = await sndTransport.produce({
    track: videoTrack,
    encodings: [
      { maxBitrate: 100000 },
      { maxBitrate: 300000 },
      { maxBitrate: 900000 },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  });
};

const consumerInitializations = async (data) => {
  console.log(data);
  consumer = await rcvTransport.consume({
    id: data.id,
    producerId: data.producerId,
    kind: data.kind,
    rtpParameters: data.rtpParameters,
  });

  const { track } = consumer;

  const stream = new MediaStream([track]);

  console.log(stream);

  return stream;
};

export {
  deviceInitialization,
  producerInitialization,
  consumerInitializations,
};
