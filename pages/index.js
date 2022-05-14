import { useState, useRef, useEffect } from "react";

import { userStream, mute } from "../utils/getUserStream";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [streamType, setStreamType] = useState("camera");
  const userVideo = useRef();

  useEffect(() => {
    userStream(streamType).then((stream) => {
      userVideo.current.srcObject = stream;
    });
  }, [streamType, mute]);

  return (
    <div>
      <section className="mt-16 grid place-items-center">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 md:gap-16">
            <Image
              src="/images/vector.svg"
              alt="audio control"
              onClick={mute}
              width={30}
              height={30}
            />
            <video
              ref={userVideo}
              autoPlay
              className="w-56 h-56 object-cover bg-black rounded-full"
            />
            <Image
              src="/images/vector-1.svg"
              alt="video control"
              width={30}
              height={30}
            />
          </div>

          <div className="flex gap-8">
            <Link href="/create">
              <button className="bg-lightGreen text-darkBlack p-5 rounded-md font-medium ">
                Create space
              </button>
            </Link>
            <Link href="/join">
              <button className="bg-lightRed text-darkBlack p-5 rounded-md font-medium ">
                Join space
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
