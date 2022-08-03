import { useEffect, useRef } from "react";

export default function Display({ userName, stream, muted }) {
  const userVideo = useRef();

  useEffect(() => {
    userVideo.current.srcObject = stream;
    userVideo.current.muted = muted;
  }, [stream]);
  return (
    <div className="flex ml-2 mr-2 h-max flex-col items-center">
      <video
        ref={userVideo}
        autoPlay
        className="w-24 h-24 object-cover max-w-none md:w-32 md:h-32 bg-darkBlack border-4 border-darkGreen rounded-full"
      />
      <p>{userName}</p>
    </div>
  );
}
