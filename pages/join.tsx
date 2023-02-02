import { useState, useRef, useEffect } from "react";

import { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { userStream } from "../utils/getUserStream";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleAudioStream,
  toggleVideoStream,
} from "../redux/mediastreamSlice";
import { setRoom } from "../redux/roomSlice";

import VideoIcon from "../public/images/vector-1.svg";
import AudioIcon from "../public/images/vector.svg";

interface streamConstraints {
  video: boolean;
  audio: boolean;
}

function Join(props) {
  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    userName: "",
  });
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

  const joinRoom = () => {
    const roomId = roomName.current.value;
    dispatch(
      setRoom({
        type: "Participant",
        userName: userName.current.value,
      })
    );
    props.router.push({
      pathname: `/room/${roomId}`,
    });
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
              alt="audio control"
              onClick={toggleSound}
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
              alt="video control"
              onClick={toggleVideo}
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
              placeholder="Space code"
              ref={roomName}
              className="w-64 pl-4 p-2 rounded-md text-darkBlack"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                joinRoom();
              }}
              className="w-max bg-lightRed text-darkBlack p-5 rounded-md font-medium "
            >
              Join space
            </button>
            <p className="text-lightGrey">
              You can also{" "}
              <Link href="/create">
                <span className="text-blue-700 cursor-pointer">
                  Create a new space
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withRouter(Join);
