import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { useRouter } from "next/router";
import Image from "next/image";

import { userStream } from "../../utils/getUserStream";

import { socketInitialization } from "../../utils/socketConnection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Display from "../../components/room/UserDisplay";
import Footer from "../../components/room/Footer";
import Feed from "../../components/room/UserFeed";

export default function Room() {
  const roomInfo = useAppSelector((state) => state.roomInfo);
  const mediaConstraints = useAppSelector((state) => state.mediaConstraints);
  console.log(roomInfo);

  const [myStream, setMyStream] = useState<MediaStream>();

  const router = useRouter();
  const path = router.query;

  useEffect(() => {
    userStream(mediaConstraints).then((stream) => {
      setMyStream(stream);
      console.log(myStream);
    });
  }, [mediaConstraints]);

  useEffect(() => {
    socketInitialization(path);
  }, []);

  return (
    <>
      <div className="h-max w-full md:w-8/12 m-auto flex flex-col-reverse justify-between md:flex-row gap-4">
        <section className="bg-darkGrey flex md:flex-col items-center gap-4 w-full md:w-max h-max md:max-h-[75vh] 2xl:max-h-[80vh] rounded-md p-4 md:p-8 overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden">
          <Display userName={roomInfo.userName} stream={myStream} />
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
