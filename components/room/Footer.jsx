import Image from "next/image";

import VideoIcon from "../../public/images/vector-1.svg";
import AudioIcon from "../../public/images/vector.svg";
import PhoneIcon from "../../public/images/phone-solid.svg";
import ScreenIcon from "../../public/images/vector-2.svg";

export default function Footer() {
  return (
    <section className="fixed w-screen h-max bottom-0 p-4 flex gap-16 items-center justify-center shadow-md">
      <Image src={PhoneIcon} alt="end call" width={30} height={30} />
      <Image src={AudioIcon} alt="audio control" width={30} height={30} />
      <Image src={VideoIcon} alt="video control" width={30} height={30} />
      <Image src={ScreenIcon} alt="screen control" width={30} height={30} />
    </section>
  );
}
