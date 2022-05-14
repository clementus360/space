import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";

import uniqid from "uniqid";

import { userStream } from "../utils/getUserStream";

const Create = (props) => {
  const [streamType, setStreamType] = useState("camera");
  const userVideo = useRef();

  useEffect(() => {
    userStream(streamType).then((stream) => {
      userVideo.current.srcObject = stream;
    });
  }, [streamType]);

  const createRoom = () => {
    const roomId = uniqid();
    props.router.push({
      pathname: `/room/${roomId}`,
    });
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
              placeholder="Space name"
              className="w-64 pl-4 p-2 rounded-md"
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
