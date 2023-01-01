// REACT & NEXT LIBRARY IMPORTS
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// CUSTOM FUNCTIONS IMPORT
import { userStream } from "../../utils/getUserStream";
import {
  socketInitialization,
  socketConnection,
  roomName,
} from "../../utils/socketConnection";

import {
  consumerInitializations,
  deviceInitialization,
  producerInitialization,
} from "../../utils/mediasoup";

// REDUX IMPORTS
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRoomName } from "../../redux/roomSlice";

// COMPONENT IMPORTS
import Display from "../../components/room/UserDisplay";
import Footer from "../../components/room/Footer";
import Feed from "../../components/room/UserFeed";

export default function Room() {
  const roomInfo = useAppSelector((state) => state.roomInfo);
  const mediaConstraints = useAppSelector((state) => state.mediaConstraints);
  const [tracks, setTracks] = useState([]);
  const [socket, setSocket] = useState(socketInitialization());
  const dispatch = useAppDispatch();

  const [myStream, setMyStream] = useState<MediaStream>();

  const router = useRouter();
  const path = router.query;

  useEffect(() => {
    socketConnection(path, roomInfo, socket);
    socket.on("setup-info", async (message) => {
      if (message.roomName) {
        dispatch(setRoomName(message.roomName));
      }
      deviceInitialization(message, socket).then(() => {
        userStream(mediaConstraints).then((stream) => {
          setMyStream(stream);
          producerInitialization(stream, socket);
        });
      });
    });

    socket.on("new-consumer", async (data) => {
      const stream = await consumerInitializations(data);
      setTracks((track) => {
        return [...track, stream];
      });
    });
  }, []);

  return (
    <>
      <div className="h-max w-full md:w-8/12 m-auto flex flex-col-reverse justify-between md:flex-row gap-4">
        <section className="bg-darkGrey flex md:flex-col items-center gap-4 w-full md:w-max h-max md:max-h-[75vh] 2xl:max-h-[80vh] rounded-md p-4 md:p-8 overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden">
          <Display
            userName={roomInfo.userName}
            stream={myStream}
            muted={true}
          />
          {tracks.map((stream) => (
            <Display userName={"aaaaaa"} stream={stream} muted={true} />
          ))}
        </section>
        <section className="bg-darkGrey w-full p-4 rounded-md flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold">{roomInfo.roomName}</h2>
            <Image
              src="/images/vector-3.svg"
              alt="copy"
              width={16}
              height={16}
            />
          </div>
          <Feed />
        </section>
      </div>
      <Footer />

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 5px;
        }

        ::-webkit-scrollbar-track {
          background: none;
        }

        ::-webkit-scrollbar-thumb {
          background: #303032;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #1a1b1e;
        }
      `}</style>
    </>
  );
}
