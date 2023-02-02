import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";

import uniqid from "uniqid";

import { userStream } from "../utils/getUserStream";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleAudioStream,
  toggleVideoStream,
} from "../redux/mediastreamSlice";
import { setRoom } from "../redux/roomSlice";

import VideoIcon from "../public/images/vector-1.svg";
import AudioIcon from "../public/images/vector.svg";

const Create = (props) => {
  const mediaConstraints = useAppSelector((state) => state.mediaConstraints);
  const dispatch = useAppDispatch();

  const userVideo = useRef<HTMLVideoElement>();
  const userName = useRef<HTMLInputElement>();
  const roomName = useRef<HTMLInputElement>();

  useEffect(() => {
    userStream(mediaConstraints).then((stream) => {
      userVideo.current.srcObject = stream;
      userVideo.current.muted = true;
    });
  }, [mediaConstraints]);

  const createRoom = () => {
    const roomId = uniqid();
    props.router.push({
      pathname: `/room/${roomId}`,
    });
    dispatch(
      setRoom({
        type: "Admin",
        roomName: roomName.current.value,
        userName: userName.current.value,
      })
    );
  };

  const toggleSound = () => {
    dispatch(toggleAudioStream());
  };

  const toggleVideo = () => {
    dispatch(toggleVideoStream());
  };

  return (
    <div>
      <section className="mt-8 grid place-items-center">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-8 md:gap-16">
            <Image
              src={AudioIcon}
              onClick={toggleSound}
              alt="audio control"
              width={30}
              height={30}
            />
            <video
              ref={userVideo}
              autoPlay
              className="w-56 h-56 object-cover bg-black rounded-full"
            />
            <Image
              src={VideoIcon}
              onClick={toggleVideo}
              alt="video control"
              width={30}
              height={30}
            />
          </div>

          <div className="flex flex-col gap-8 items-center">
            <input
              type="text"
              placeholder="Username"
              ref={userName}
              className="w-64 pl-4 p-2 rounded-md text-darkBlack"
            />
            <input
              type="text"
              placeholder="Space name"
              ref={roomName}
              className="w-64 pl-4 p-2 rounded-md text-darkBlack"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                createRoom();
              }}
              className="w-max bg-lightGreen text-darkBlack p-5 rounded-md font-medium "
            >
              Create space
            </button>
            <p className="text-lightGrey">
              You can also{" "}
              <Link href="/join">
                <span className="text-blue-700 cursor-pointer">
                  Join an existing space
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(Create);
