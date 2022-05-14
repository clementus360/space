import { useState, useRef, useEffect } from "react";

import { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { userStream } from "../utils/getUserStream";

function Join(props) {
  const [streamType, setStreamType] = useState("camera");
  const [room, setRoom] = useState("");
  const userVideo = useRef();

  useEffect(() => {
    userStream(streamType).then((stream) => {
      userVideo.current.srcObject = stream;
    });
  }, [streamType]);

  const joinRoom = () => {
    const roomId = room;
    props.router.push({
      pathname: `/room/${roomId}`,
    });
  };

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <div>
      <section className="mt-8 grid place-items-center">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-8 md:gap-16">
            <Image
              src="/images/vector.svg"
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
              src="/images/vector-1.svg"
              alt="video control"
              width={30}
              height={30}
            />
          </div>

          <div className="flex flex-col gap-8 items-center">
            <input
              type="text"
              placeholder="Username"
              className="w-64 pl-4 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Space code"
              value={room}
              onChange={handleChange}
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
