import { useState, useRef, useEffect } from "react";

import { userStream } from "../utils/getUserStream";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleAudioStream,
  toggleVideoStream,
} from "../redux/mediastreamSlice";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const mediaConstraints = useAppSelector((state) => state.mediaConstraints);
  const dispatch = useAppDispatch();

  const userVideo = useRef<HTMLVideoElement>();

  useEffect(() => {
    userStream(mediaConstraints).then((stream) => {
      userVideo.current.srcObject = stream;
      userVideo.current.muted = true;
    });
  }, [mediaConstraints]);

  const toggleSound = () => {
    dispatch(toggleAudioStream());
  };

  const toggleVideo = () => {
    dispatch(toggleVideoStream());
  };

  return (
    <div>
      <section className="mt-16 grid place-items-center">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 md:gap-16">
            <Image
              src="/images/audio.svg"
              onClick={toggleSound}
              alt="audio control"
              width={30}
              height={30}
            />
            <video
              ref={userVideo}
              autoPlay
              className="w-56 h-56 scale-x-[-1] object-cover bg-black rounded-full"
            />
            <Image
              src="/images/video.svg"
              onClick={toggleVideo}
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
